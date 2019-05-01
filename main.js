//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents');
if (setupEvents.handleSquirrelEvent()) {
	// squirrel event handled and app will exit in 1000ms, so don't do anything else
	return;
}

const { app, BrowserWindow, Menu, dialog } = require('electron');
const ipcMain = require('electron').ipcMain;
const menuTemplate = require('./utils/menu');
const isDev = require('./utils/isDev');
const keys = require('./src/config');
const createSampleOrders = require('./utils/createSampleOrders');
const mongoose = require('mongoose');
const Order = require('./schemas/OrdersSchema');
const checkConnection = require('./utils/checkConnection');

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
	// Create the browser window.
	win = new BrowserWindow({
		width: 1000,
		height: 800,
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
app.on('ready', createWindow);

// Create Database Connection
app.on('ready', () => {
	if (checkConnection() === 'Connected') {
		mongoose.connect(
			'mongodb://cowboy8038:Nascar8038@ds117111.mlab.com:17111/reddirt-photo-order-dev',
			{ useNewUrlParser: true },
			err => {
				if (err) {
					console.log(err);
				} else {
					console.log('Database connected');
				}
			},
		);
	}
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

ipcMain.on('user-data', (event, arg) => {
	console.log('arg');
});

ipcMain.on('write-order-db', (event, arg) => {
	const newOrder = new Order(arg);
	newOrder.save(err => {
		if (err) {
			console.log(err);
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
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
