import React, { useEffect, useState } from 'react';

import Home from './Home';
import NewOrder from './NewOrder';
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

	ipcRenderer.on('clear-event', () => {
		localStorage.removeItem('Current Event');
		setEvent('');
	});
	let content;

	switch (currentPage) {
		case 'Current Event':
			content = <CurrentEvent setPage={setPage} />;
			break;
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
