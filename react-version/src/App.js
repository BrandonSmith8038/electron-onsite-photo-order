import React, { useEffect, useState } from 'react';

import Home from './Home';
import NewOrder from './NewOrder';
import CreateEvent from './CreateEvent';
import Sidebar from './components/Sidebar';

import { AppWrapper } from './Layout';

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
	let content;

	switch (currentPage) {
		case 'New Order':
			content = <NewOrder setPage={setPage} />;
			break;
		case 'Create Event':
			content = <CreateEvent setPage={setPage} setEvent={setEvent} />;
			break;
		case 'Home':
			content = (
				<Home
					connectionStatus={connectionStatus}
					currentPage={currentPage}
					setPage={setPage}
					currentEvent={currentEvent}
					setEvent={setEvent}
					eventEnd={eventEnd}
				/>
			);
			break;
		default:
			return <h1>No Component Found</h1>;
	}

	return (
		<AppWrapper>
			<Sidebar />
			{content}
		</AppWrapper>
	);
}

export default App;
