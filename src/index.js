const electron = require('electron');
const path = require('path');
const remote = electron.remote;
const shell = electron.shell;
const dns = require('dns');
const BrowserWindow = electron.remote.BrowserWindow;
const ipcRenderer = electron.ipcRenderer;
const { nightlyTotal, numberOfOrders } = require('../utils/nightlyOrderTotals');
// const checkInternetConnected = require('check-internet-connected');
const homeDir = require('os').homedir();

// Grab The Main New Order Button
const newOrderButton = document.querySelector('#new-order-button');
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

// Check If Online or Offline

const checkConnection = () => {
	const isConnected = dns.lookup('google.com', err => {
		if (err) {
			document.querySelector('.connection-test').innerHTML = 'Offline';
			document.querySelector('.connection-test').style.color = '#d32f2f';
		} else {
			document.querySelector('.connection-test').innerHTML = 'Online';
			document.querySelector('.connection-test').style.color = '#2e7d32';
		}
	});
};

setInterval(() => {
	checkConnection();
}, 5000);
