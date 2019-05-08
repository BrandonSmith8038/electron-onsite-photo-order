const fs = require('fs');
const electron = require('electron');
const { dialog, BrowserWindow } = require('electron');
const rootPath = require('electron-root-path').rootPath;
const getDate = require('../utils/getDate');
const remote = electron.remote;
const homeDir = require('os').homedir();
const isConnected = require('../utils/checkConnection');
const form = document.querySelector('form');
const { ipcRenderer } = require('electron');

const autoComplete = document.querySelector('.auto-complete');
const date = document.querySelector('#date');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const street = document.querySelector('#street');
const city = document.querySelector('#city');
const state = document.querySelector('#state');
const zip = document.querySelector('#zip');
const photos = document.querySelector('#photos');
const notes = document.querySelector('#notes');
const payment = document.querySelector('#payment-method');
const total = document.querySelector('#total');
const firstNameLabel = document.querySelector('label[for=first-name]');
const lastNameLabel = document.querySelector('label[for=last-name]');
const emailLabel = document.querySelector('label[for=email]');
const phoneLabel = document.querySelector('label[for=phone]');

let customers;
let connectionStatus = 'Not Connected';
const eventDetails = JSON.parse(localStorage.getItem('Current Event'));
date.value = getDate();

const getCustomers = () => {
	ipcRenderer.send('getCustomers');
};

ipcRenderer.on('sendCustomers', (event, arg) => {
	customers = JSON.parse(arg);
});
window.addEventListener('DOMContentLoaded', getCustomers);

const getSelectedCustomerInfo = e => {
	if (!e.target.matches('li')) return;
	const selectedName = e.target.dataset.name;
	let customerInfo = customers.filter(customer => {
		const regex = new RegExp(`^${selectedName}`, 'gi');
		return customer.name.match(regex);
	});
	const {
		name,
		contact: { email: emailValue, phone: phoneValue },
	} = customerInfo[0];
	const firstNameValue = name
		.split(' ')
		.slice(0, -1)
		.join(' ');
	const lastNameValue = name
		.split(' ')
		.slice(-1)
		.join(' ');

	if (firstNameValue) {
		firstName.value = firstNameValue;
		firstNameLabel.classList.add('active');
	}

	if (lastNameValue) {
		lastName.value = lastNameValue;
		lastNameLabel.classList.add('active');
	}

	if (emailValue) {
		email.value = emailValue;
		emailLabel.classList.add('active');
	}
	if (phoneValue) {
		phone.value = phoneValue;
		phoneLabel.classList.add('active');
	}
	autoComplete.style.display = 'none';
	autoComplete.innerHTML = '';
};

autoComplete.addEventListener('click', getSelectedCustomerInfo);

const searchCustomers = searchText => {
	let matches = customers.filter(customer => {
		const regex = new RegExp(`^${searchText}`, 'gi');
		return customer.name.match(regex);
	});

	if (searchText.length < 3) {
		matches = [];
		autoComplete.style.display = 'none';
		autoComplete.innerHTML = '';
	}
	if (searchText.length > 2 && matches.length !== 0) {
		outputHTML(matches);
	}
};

const outputHTML = matches => {
	autoComplete.style.display = 'inline-block';
	if (matches.length > 0) {
		const html = matches
			.map(
				customer =>
					`<li class="autocomplete-item" data-name="${customer.name}">${
						customer.name
					}</li>`,
			)
			.join('');
		autoComplete.innerHTML = html;
	}
};

setInterval(() => {
	if (isConnected() === 'Connected') {
		connectionStatus = 'Connected';
	}
}, 2000);

firstName.addEventListener('input', () => searchCustomers(firstName.value));

const onSubmit = e => {
	e.preventDefault();

	const newOrder = {};
	newOrder.eventName = eventDetails.eventName;
	newOrder.venue = eventDetails.venue;
	if (date.value) newOrder.date = date.value;
	if (lastName.value) newOrder.lastName = lastName.value;
	if (firstName.value) newOrder.firstName = firstName.value;
	if (email.value) newOrder.email = email.value;
	if (phone.value) newOrder.phone = phone.value;
	if (street.value) newOrder.street = street.value;
	if (city.value) newOrder.city = city.value;
	if (state.value) newOrder.state = state.value;
	if (zip.value) newOrder.city = zip.value;
	if (photos.value) newOrder.photos = photos.value;
	if (notes.value) newOrder.notes = notes.value;
	if (!payment.value) {
		M.toast({ html: 'You Must Choose A Payment Type', classes: 'rounded' });
		return;
	} else {
		newOrder.payment = payment.value;
	}

	if (total.value) newOrder.total = total.value;

	const newOrderJSON = JSON.stringify(newOrder);

	const filePath = `${homeDir}/Orders/${newOrder.date}-${newOrder.firstName} ${
		newOrder.lastName
	}.json`;

	const notification = {
		title: 'Order Saved....',
		icon: '../assets/img/logo.png',
		body: `New Order Saved | ${newOrder.firstName} ${newOrder.lastName} | $${
			newOrder.total
		}`,
	};

	fs.writeFile(filePath, newOrderJSON, 'utf8', err => {
		if (err) {
			return;
		}
		const successNotification = new Notification(
			notification.title,
			notification,
		);

		successNotification.onshow = () => {
			let window = remote.getCurrentWindow();
			window.close();
		};
	});
};

form.addEventListener('submit', onSubmit);
