const electron = require('electron');
const path = require('path');
const remote = electron.remote;
const BrowserWindow = electron.remote.BrowserWindow;

// Grab The Main New Order Button
const newOrderButton = document.querySelector('#new-order-button');

// Initialize The Materialize SideNav
document.addEventListener('DOMContentLoaded', function() {
	const elems = document.querySelectorAll('.sidenav');
	const options = {};
	const instances = M.Sidenav.init(elems, options);
});

// Creates The Add New Order Window
newOrderButton.addEventListener('click', () => {
	const formPath = path.join('file://', __dirname, 'new-order.html');
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		alwaysOnTop: true,
		frame: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.on('close', () => (win = null));
	win.loadURL(formPath);
	win.show();
});
