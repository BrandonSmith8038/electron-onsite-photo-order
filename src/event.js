const electron = require('electron');
const remote = electron.remote;
const form = document.querySelector('form');
const eventName = document.querySelector('#event-name');
const venue = document.querySelector('#venue');

const onSubmit = e => {
	console.log('Submitted');
	e.preventDefault();

	const currentEvent = {};
	if (eventName.value) currentEvent.eventName = eventName.value;
	if (venue.value) currentEvent.venue = venue.value;

	localStorage.setItem('Current Event', JSON.stringify(currentEvent));
	let window = remote.getCurrentWindow();
	window.close();
};

form.addEventListener('submit', onSubmit);
