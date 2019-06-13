import React, { useEffect } from 'react';
import { BackButton } from './components/Buttons';
import { MainWrapper } from './Layout';

const { ipcRenderer } = window.require('electron');

const CurrentEvent = () => {
	useEffect(() => {
		ipcRenderer.send('get-current-orders');
	}, []);

	return (
		<MainWrapper>
			<h1>Current Event</h1>
		</MainWrapper>
	);
};

export default CurrentEvent;
