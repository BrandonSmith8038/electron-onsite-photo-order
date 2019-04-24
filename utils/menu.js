const electron = require('electron');
const { dialog, BrowserWindow } = require('electron');
const path = require('path');
const clearOrders = require('./clearOrders');
const createSampleOrders = require('./createSampleOrders');
const createPDF = require('./createPDF');

let options = {
	buttons: ['Yes', 'Cancel'],
	message: [
		'Are You Sure You Want To Delete The Currently Saved Orders?',
		'Are Your Absolutely Sure You Want To Delete The Currently Saved Orders?',
	],
};

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
				label: "Create PDF/'s",
				click() {
					try {
						createPDF();
					} catch (error) {
						dialog.showErrorBox(`Error Saving Files`, error);
					}
					dialog.showMessageBox({
						message: `PDF's Have Been Saved`,
						buttons: ['Ok'],
					});
				},
			},
			{
				label: 'Clear Current Orders',
				click() {
					dialog.showMessageBox(
						{ buttons: options.buttons, message: options.message[0] },
						response => {
							if (response === 1) {
								return;
							}

							dialog.showMessageBox(
								{
									buttons: options.buttons,
									message: options.message[1],
								},
								response => {
									if (response === 1) {
										return;
									}
									clearOrders();
								},
							);
						},
					);
				},
			},
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
	{
		label: 'Development',
		submenu: [
			{
				label: 'Create Sample Files',
				click() {
					createSampleOrders();
				},
			},
			{ role: 'separator' },
			{ role: 'forcereload' },
			{ role: 'toggledevtools' },
		],
	},
];
