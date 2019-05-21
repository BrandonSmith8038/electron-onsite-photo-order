import React, { useEffect, useState } from 'react';

import Home from './Home';
import logo from './logo.svg';

import './App.css';

function App() {
	const [connectionStatus, setConnectionStatus] = useState('');

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

	return (
		<div className='App'>
			<Home connectionStatus={connectionStatus} />
		</div>
	);
}

export default App;
