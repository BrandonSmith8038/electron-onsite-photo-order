const electron = require('electron');
const path = require('path');
const remote = electron.remote;
const BrowserWindow = electron.remote.BrowserWindow;

const newOrderButton = document.querySelector('#new-order-button');

newOrderButton.addEventListener('click', () => {
	const formPath = path.join('file://', __dirname, 'new-order.html');
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		alwaysOnTop: true,
		frame: false,
	});

	win.on('close', () => (win = null));
	win.loadURL(formPath);
	win.show();
});
