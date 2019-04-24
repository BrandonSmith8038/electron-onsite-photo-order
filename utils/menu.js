const { dialog } = require('electron');
const clearOrders = require('./clearOrders');

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
					console.log('New Order');
				},
			},
			{
				label: "Create PDF/'s",
				click() {
					console.log("Create PDF/'s");
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
					console.log('Create Sample Files');
				},
			},
			{ role: 'separator' },
			{ role: 'forcereload' },
			{ role: 'toggledevtools' },
		],
	},
];
