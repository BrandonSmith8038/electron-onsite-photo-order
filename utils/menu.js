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
				label: "Create PDF's",
				click() {
					console.log("Create PDF's");
				},
			},
			{
				label: 'Clear Current Orders',
				click() {
					console.log('Clear Current');
				},
			},
			{ role: 'seperator' },
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
		submenu: [{ role: 'forcereload' }, { role: 'toggledevtools' }],
	},
];
