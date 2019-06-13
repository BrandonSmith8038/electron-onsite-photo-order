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
const os = require('os');
const url = require('url');
const electron = require('electron');
const { app, BrowserWindow, Menu, dialog } = require('electron');
const ipcMain = require('electron').ipcMain;
const keys = require('./config');
const mongoose = require('mongoose');
const Order = require('./schemas/OrdersSchema');
const isDev = require('./utils/isDev');
const menuTemplate = require('./utils/menu');
const createSampleOrders = require('./utils/createSampleOrders');
const rootPath = require('electron-root-path');
const getCustomers = require('./utils/fetchCustomers');

const ipcMainFunctions = require('./ipcmain');

const checkConnection = require('./utils/checkConnection');
const clearOrders = require('./utils/clearOrders');

const customerJSON = keys.CUSTOMERSFILE;

mongoose.Promise = global.Promise;

// Run All ipc main functions
ipcMainFunctions.getCustomers();
ipcMainFunctions.writeOrderDB();
ipcMainFunctions.notifyOrderTotals();
ipcMainFunctions.eventEndNoConnection();
ipcMainFunctions.eventEndWithConnection();
ipcMainFunctions.createOrder();

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
	let screens = electron.screen.getAllDisplays();
	let mainDisplay = electron.screen.getPrimaryDisplay();

	if (screens.length > 1) {
		win = new BrowserWindow({
			// Create the browser window.

			width: 1000,
			height: 800,
			x: mainDisplay.bounds.width + 450,
			y: mainDisplay.bounds.y + 250,
			webPreferences: {
				nodeIntegration: true,
			},
		});
	} else {
		win = new BrowserWindow({
			width: 1000,
			height: 800,
			icon: path.join(__dirname, 'assets/icons/png/64X64.png'),
			webPreferences: {
				nodeIntegration: true,
			},
		});
	}
	// Create the browser window.
	// and load the index.html of the app.
	win.loadURL('http://localhost:3000');

	if (isDev()) {
		// Open the DevTools.
		win.webContents.openDevTools();
	}

	BrowserWindow.addDevToolsExtension(
		path.join(
			os.homedir(),
			'.config/google-chrome/Default/Extensions/pkmnigdcbihgkcpblhoollboafggfkpm/4.0.0.6_0',
		),
	);

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
			{
				label: 'Fetch Customers',
				click() {
					getCustomers();
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
			mongoose.connect(keys.MONGOURI, { useNewUrlParser: true }, err => {
				if (err) {
					throw err;
				} else {
					console.log('Database Connected');
				}
			});
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
