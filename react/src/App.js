import React, { useEffect, useState } from 'react';

import Home from './Home';
import NewOrder from './NewOrder';
import EditOrder from './EditOrder';
import CreateEvent from './CreateEvent';
import CurrentEvent from './CurrentEvent';
import { SideBar } from './components/SideBar';

import { AppWrapper, MainWrapper } from './Layout';
import { BackButton } from './components/Buttons';

const { ipcRenderer } = window.require('electron');

function App() {
	const [connectionStatus, setConnectionStatus] = useState('');
	const [currentPage, setPage] = useState('Home');
	const [currentEvent, setEvent] = useState('');
	const [currentOrder, setCurrentOrder] = useState('');

	useEffect(() => {
		const currentEvent = localStorage.getItem('Current Event');
		if (currentEvent) {
			setEvent(JSON.parse(currentEvent));
			ipcRenderer.send(
				'local-storage-current-event-change',
				JSON.parse(currentEvent),
				'set',
				'App.js',
			);
		}
	}, []);

	useEffect(() => {
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
			ipcRenderer.send('event-end-with-connection', currentEvent);
		} else {
			ipcRenderer.send('event-end-no-connection');
		}
	};

	ipcRenderer.on('clear-event', () => {
		localStorage.removeItem('Current Event');
		ipcRenderer.send(
			'local-storage-current-event-change',
			'',
			'removed',
			'App.js',
		);
		setEvent('');
	});
	let content;

	switch (currentPage) {
		case 'Current Event':
			content = (
				<CurrentEvent setPage={setPage} setCurrentOrder={setCurrentOrder} />
			);
			break;
		case 'New Order':
			content = <NewOrder setPage={setPage} />;
			break;
		case 'Edit Order':
			content = <EditOrder setPage={setPage} currentOrder={currentOrder} />;
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
			content = (
				<MainWrapper>
					<BackButton
						onClick={() => {
							setPage('Home');
						}}
					/>
					<h1>404 Not Found</h1>
				</MainWrapper>
			);
	}

	return (
		<AppWrapper>
			<SideBar setPage={setPage} />
			{content}
		</AppWrapper>
	);
}

export default App;
