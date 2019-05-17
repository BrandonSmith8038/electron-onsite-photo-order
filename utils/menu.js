const electron = require('electron');
const { shell } = require('electron');
const { dialog, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const clearOrders = require('./clearOrders');
const createPDF = require('./createPDF');
const homeDir = require('os').homedir();
const remote = require('electron').remote;
const ipcMain = require('electron').ipcMain;

let options = {
	buttons: ['Yes', 'Cancel'],
	message: [
		'Are You Sure You Want To Delete The Currently Saved Orders?',
		'Are Your Absolutely Sure You Want To Delete The Currently Saved Orders?',
	],
};

// const win = require('electron').remote.app;

module.exports = [
	{
		label: 'File',
		submenu: [
			{
				label: 'New Order',
				click() {
					const formPath = path.join(
						'file://',
						__dirname,
						'../src/new-order.html',
					);
					let win = new BrowserWindow({
						width: 800,
						height: 600,
						alwaysOnTop: true,
						frame: false,
					});

					win.on('close', () => (win = null));
					win.loadURL(formPath);
					win.show();
				},
			},
			{
				label: 'Open Orders Folder',
				click() {
					shell.openItem(`${homeDir}/Orders`);
				},
			},
			{
				label: 'Clear Current Orders',
				click() {
					clearOrders();
				},
			},
			//{
			// 	label: 'Force End Event',
			// 	click() {
			// 		console.log(win);
			// 		// BrowserWindow.webContents.send('ping', 'whoooooooh!');
			// 	},
			// },
			{ role: 'separator' },
			{ role: 'quit' },
		],
	},
	{
		label: 'Edit',
		submenu: [
			{ role: 'undo' },
			{ role: 'redo' },
			{ type: 'separator' },
			{ role: 'cut' },
			{ role: 'copy' },
			{ role: 'paste' },
			{ role: 'delete' },
			{ role: 'selectall' },
		],
	},
];
