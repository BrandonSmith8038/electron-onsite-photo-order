//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents');
if (setupEvents.handleSquirrelEvent()) {
	// squirrel event handled and app will exit in 1000ms, so don't do anything else
	return;
}
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const homeDir = require('os').homedir();
const electron = require('electron');
const { app, BrowserWindow, Menu, dialog } = require('electron');
const ipcMain = require('electron').ipcMain;
const keys = require('./src/config');
const mongoose = require('mongoose');
const Order = require('./schemas/OrdersSchema');
const isDev = require('./utils/isDev');
const menuTemplate = require('./utils/menu');
const createSampleOrders = require('./utils/createSampleOrders');

const checkConnection = require('./utils/checkConnection');
const clearOrders = require('./utils/clearOrders');

mongoose.Promise = global.Promise;

if (isDev()) {
	// Enable live reload for Electron too
	require('electron-reload')(__dirname, {
		// Note that the path to electron may vary according to the main file
		electron: require(`${__dirname}/node_modules/electron`),
	});
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
	let mainDisplay = electron.screen.getPrimaryDisplay();
	// Create the browser window.
	win = new BrowserWindow({
		width: 1000,
		height: 800,
		x: mainDisplay.bounds.width + 450,
		y: mainDisplay.bounds.y + 250,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	// and load the index.html of the app.
	win.loadURL(`file://${__dirname}/src/index.html`);

	if (isDev()) {
		// Open the DevTools.
		win.webContents.openDevTools();
	}

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null;
	});
}

// Dont Show The Development Menu In Production
if (isDev()) {
	menuTemplate.push({
		label: 'Development',
		submenu: [
			{
				label: 'Create Sample Files',
				click() {
					createSampleOrders();
				},
			},
			{
				label: 'Test DB Order',
				click() {
					const newOrder = new Order({
						firstName: 'Josh',
						lastName: 'Johnson',
						total: '34',
					});
					newOrder.save();
				},
			},
			{ role: 'separator' },
			{ role: 'forcereload' },
			{ role: 'toggledevtools' },
		],
	});
}
// Create Menu From Template
const menu = Menu.buildFromTemplate(menuTemplate);

// Set The Menu
Menu.setApplicationMenu(menu);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', () => {
	createWindow();
	checkConnection();
	// Create Database Connection
	setTimeout(() => {
		if (checkConnection() === 'Connected') {
			mongoose.connect(
				'mongodb://cowboy8038:Nascar8038@ds117111.mlab.com:17111/reddirt-photo-order-dev',
				{ useNewUrlParser: true },
				err => {
					if (err) {
					} else {
					}
				},
			);
		}
	}, 2000);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow();
	}
});

ipcMain.on('user-data', (event, arg) => {});

ipcMain.on('write-order-db', (event, arg) => {
	const newOrder = new Order(arg);
	newOrder.save(err => {
		if (err) {
		}
	});
});

ipcMain.on('notify-order-totals', (event, arg) => {
	const { nightlyTotal, numberOfOrders } = arg;
	const options = {
		type: 'info',
		buttons: ['Ok'],
		title: 'Nightly Order Info',
	};

	numberOfOrders === 0
		? (options.message = "You haven't sold anything yet, get busy!")
		: (options.message = `So far you have made ${numberOfOrders} sales totaling ${nightlyTotal}!`);

	dialog.showMessageBox(null, options);
});

ipcMain.on('event-end-no-connection', () => {
	const options = {
		type: 'error',
		buttons: ['Ok'],
		title: 'Error',
		message: 'You Must Be Connected To The Internet First',
	};
	dialog.showMessageBox(null, options);
});

ipcMain.on('event-end-with-connection', () => {
	const options = {
		type: 'question',
		buttons: ['No', 'Yes'],
		title: 'Are You Sure You Want To End This Event?',
	};
	dialog.showMessageBox(null, options, response => {
		//TODO Need To Add Confirmation Dialogs
		if (response === 0) return;
		const ordersDirectory = `${homeDir}/Orders`;
		const pdfDirectory = `${homeDir}/Orders/PDFs`;
		// Look in The Orders Directory and see if there are files
		const files = fs.readdirSync(ordersDirectory);
		// Show Error If There Are No Files
		if (files.length <= 1) {
			dialog.showErrorBox(`Error Saving Files `, 'There Are No Orders To Use');
		}
		for (const file of files) {
			const stats = fs.statSync(path.join(ordersDirectory, file));
			if (stats.isFile()) {
				const data = fs.readFileSync(path.join(ordersDirectory, file));
				const orderData = JSON.parse(data);
				//TODO: Check If Folders Already Exist
				fsPromises
					.mkdir(`${pdfDirectory}/${orderData.firstName} ${orderData.lastName}`)
					.catch(e => console.error(e))
					.then(() => {
						const createPDF = require('./utils/createPDF');
						//TODO Need TO Change This To A Promise
						createPDF(orderData);
					})
					.then(() => {
						const newOrder = new Order(orderData);
						newOrder
							.save()
							.catch(e => console.error(e))
							.then(() => {
								fs.unlink(path.join(ordersDirectory, file), err => {
									if (err) throw err;
									win.webContents.send('clear-event');
								});
							});
					});
			}
		}
	});
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
