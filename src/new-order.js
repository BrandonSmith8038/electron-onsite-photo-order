const fs = require('fs');
const electron = require('electron');
const { dialog, BrowserWindow } = require('electron');
const rootPath = require('electron-root-path').rootPath;
const remote = electron.remote;
const homeDir = require('os').homedir();

const form = document.querySelector('form');

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

const getDate = () => {
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth() + 1;
	let yyyy = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd;
	}

	if (mm < 10) {
		mm = '0' + mm;
	}
	today = `${mm}-${dd}-${yyyy}`;

	return today;
};

date.value = getDate();

const onSubmit = e => {
	e.preventDefault();

	const newOrder = {};
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
	if (payment.value) newOrder.payment = payment.value;
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
			console.log(err);
			return;
		}
		const successNotification = new Notification(
			notification.title,
			notification,
		);

		successNotification.onshow = () => {
			console.log('Notificiation Shown');
			let window = remote.getCurrentWindow();
			window.close();
		};
	});
};

form.addEventListener('submit', onSubmit);
