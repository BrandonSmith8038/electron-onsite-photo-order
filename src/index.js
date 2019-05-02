const electron = require('electron');
const path = require('path');
const remote = electron.remote;
const shell = electron.shell;
const dns = require('dns');
const BrowserWindow = electron.remote.BrowserWindow;
const ipcRenderer = electron.ipcRenderer;
const { nightlyTotal, numberOfOrders } = require('../utils/nightlyOrderTotals');
const isConnected = require('../utils/checkConnection');
// const checkInternetConnected = require('check-internet-connected');
const homeDir = require('os').homedir();

const newOrderButton = document.querySelector('#new-order-button');
const eventButton = document.querySelector('#event-button');
const getNightlyTotalBtn = document.querySelector('#get-total');
const openOrdersFolderBtn = document.querySelector('#open-orders-folder');

// Initialize The Materialize SideNav
document.addEventListener('DOMContentLoaded', function() {
	const elems = document.querySelectorAll('.sidenav');
	const options = {};
	const instances = M.Sidenav.init(elems, options);
});

// Open orders folder when menu item is clicked
openOrdersFolderBtn.addEventListener('click', () => {
	console.log('Open Orders folder Button click');
	shell.openItem(`${homeDir}/Orders`);
});

// Get Nightly Totals When Menu Item Clicked
getNightlyTotalBtn.addEventListener('click', () => {
	ipcRenderer.send('notify-order-totals', { nightlyTotal, numberOfOrders });
});

// Creates The Add New Order Window
newOrderButton.addEventListener('click', () => {
	const formPath = path.join('file://', __dirname, 'new-order.html');
	let mainDisplay = electron.screen.getPrimaryDisplay();
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		alwaysOnTop: true,
		frame: true,
		x: mainDisplay.bounds.width + 450,
		y: mainDisplay.bounds.y + 250,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.on('close', () => (win = null));
	win.loadURL(formPath);
	win.show();
});

// Check If Online or Offline
setInterval(() => {
	if (isConnected() === 'Connected') {
		document.querySelector('.connection-test').innerHTML = 'Online';
		document.querySelector('.connection-test').style.color = '#2e7d32';
	} else {
		document.querySelector('.connection-test').innerHTML = 'Offline';
		document.querySelector('.connection-test').style.color = '#d32f2f';
	}
}, 5000);

// Starting & Ending and Events
eventButton.addEventListener('click', () =>
	console.log('Event Button Clicked'),
);
