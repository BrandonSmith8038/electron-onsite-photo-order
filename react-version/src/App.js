import React, { useEffect, useState } from 'react';

import Home from './Home';
import logo from './logo.svg';

import './App.css';

const { ipcRenderer } = window.require('electron');

function App() {
	const [connectionStatus, setConnectionStatus] = useState('');
	const [currentPage, setPage] = useState('Home');
	const [currentEvent, setEvent] = useState('');

	useEffect(() => {
		const currentEvent = localStorage.getItem('Current Event');
		if (currentEvent) {
			setEvent(JSON.parse(currentEvent));
		}

		setInterval(() => {
			const isOnline = navigator.onLine;
			if (isOnline) {
				setConnectionStatus('Online');
			} else {
				setConnectionStatus('Offline');
			}
		}, 5000);
	}, [connectionStatus]);

	const eventEnd = () => {
		if (connectionStatus === 'Online') {
			ipcRenderer.send('event-end-with-connection');
		} else {
			ipcRenderer.send('event-end-no-connection');
		}
	};

	ipcRenderer.on('ping', (event, message) => {
		console.log(message); // Prints 'whoooooooh!'
	});

	ipcRenderer.on('clear-event', () => {
		localStorage.removeItem('Current Event');
		setEvent('');
	});
	return (
		<div className='App'>
			<Home
				connectionStatus={connectionStatus}
				currentPage={currentPage}
				setPage={setPage}
				currentEvent={currentEvent}
				setEvent={setEvent}
				eventEnd={eventEnd}
			/>
		</div>
	);
}

export default App;
