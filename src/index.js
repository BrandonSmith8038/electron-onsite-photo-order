const electron = require('electron');
const fs = require('fs');
const path = require('path');
const remote = electron.remote;
const shell = electron.shell;
const dns = require('dns');
const BrowserWindow = electron.remote.BrowserWindow;
const ipcRenderer = electron.ipcRenderer;
const rootPath = require('electron-root-path').rootPath;
const { nightlyTotal, numberOfOrders } = require('../utils/nightlyOrderTotals');
const isConnected = require('../utils/checkConnection');
const clearOrders = require('../utils/clearOrders');
const fetch = require('node-fetch');

// const checkInternetConnected = require('check-internet-connected');
const homeDir = require('os').homedir();
// const fetchCustomers = require('../utils/fetchCustomers');

const newOrderButton = document.querySelector('#new-order-button');
const eventButton = document.querySelector('#event-button');
const getNightlyTotalBtn = document.querySelector('#get-total');
const openOrdersFolderBtn = document.querySelector('#open-orders-folder');

const query = `query {
  business(id: "QnVzaW5lc3M6NDgxZDExM2QtMzUxOC00YzBiLWFiOTItZWM1MTMyNDBiMTFh") {
    id
    name
    customers(page: 1, pageSize: 50) {
      edges {
        node {
          id
          name
					email
					phone
        }
      }
    }
  }
}`;

const fetchCustomers = () => {
	let customers = {};
	let customerJson = {};
	fetch('https://gql.waveapps.com/graphql/public', {
		method: 'POST',
		headers: {
			Authorization: 'Bearer 44JWI9Z5Jk9ZBDpjnu1w13bXYiYM9j',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query }),
	})
		.then(res => res.json())
		.then(data => {
			let customers = data.data.business.customers;
			const keys = Object.values(customers);
			const allCustomers = keys[0];
			allCustomers.forEach(customer => {
				const name = customer.node.name;
				const email = customer.node.email;
				const phone = customer.node.phone;
				const person = {};
				person.name = name;
				if (email) person.email = email;
				if (phone) person.phone = phone;
				const personJson = JSON.stringify(person);
				let c = Object.assign(customerJson, person);
				console.log('After Merge', c);
				//! Need To Still Merge Each Person Into One Large Object
			});
		})
		.then(() => {
			// fs.writeFile(
			// 	`${rootPath}/customers.json`,
			// 	JSON.stringify(customerJson),
			// 	err => {
			// 		console.log(err);
			// 	},
			// );
		});
};
// const saveCustomersToFile = customerList => {

// }
fetchCustomers();

// Initialize The Materialize SideNav
document.addEventListener('DOMContentLoaded', function() {
	const elems = document.querySelectorAll('.sidenav');
	const options = {};
	const instances = M.Sidenav.init(elems, options);
});

// Open orders folder when menu item is clicked
openOrdersFolderBtn.addEventListener('click', () => {
	shell.openItem(`${homeDir}/Orders`);
});
// const getCustomers = async () => {
// 	const allCustomers = await fetchCustomers;
// 	console.log('allCustomers: ', allCustomers);
// };
// getCustomers();
// console.log(fetchCustomers());

// Get Nfightly Totals When Menu Item Clicked
getNightlyTotalBtn.addEventListener('click', () => {
	ipcRenderer.send('notify-order-totals', { nightlyTotal, numberOfOrders });
});

// Creates The Add New Order Window
newOrderButton.addEventListener('click', () => {
	const orderPath = path.join('file://', __dirname, 'new-order.html');
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
	win.loadURL(orderPath);
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

// Change Event Button Text If There Is a Event Currently In Local Storage
if (localStorage.getItem('Current Event')) {
	eventButton.innerHTML = 'End Event';
}

if (localStorage.getItem('Current Event') === null) {
	// Hide the new order button until a event has been created
	newOrderButton.style.display = 'none';
}

// Starting & Ending and Events
eventButton.addEventListener('click', () => {
	if (localStorage.getItem('Current Event') === null) {
		const orderPath = path.join('file://', __dirname, 'event.html');
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
		win.loadURL(orderPath);
		win.show();
		// Change Event Button Text
		eventButton.innerHTML = 'End Event';
		// Show The New Order Button
		newOrderButton.style.display = 'inline-block';
	}
	if (localStorage.getItem('Current Event')) {
		if (isConnected() === 'Connected') {
			ipcRenderer.send('event-end-with-connection');
		} else {
			ipcRenderer.send('event-end-no-connection');
		}
	}

	// Clear local storage and set button states
	ipcRenderer.on('clear-event', () => {
		// Clear All The Current Orders
		// clearOrders();
		localStorage.removeItem('Current Event');
		eventButton.innerHTML = 'Create Event';
		newOrderButton.style.display = 'none';
	});
});
