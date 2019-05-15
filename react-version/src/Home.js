import { withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import CreateEvent from './CreateEvent';
import Logo from './img/logo.png';
import NewOrder from './NewOrder';
import isDev from './utils/isDev';

const { ipcRenderer } = window.require('electron');

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
});

const MainWrapper = styled.div`
	display: flex;
	height: 100vh;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Home = props => {
	const [currentPage, setPage] = useState('Home');
	const [connectionStatus, setConnectionStatus] = useState('');
	const [currentEvent, setEvent] = useState('');

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
	// Check the connection status every 5 seconds
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

	const { classes } = props;
	switch (currentPage) {
		case 'New Order':
			return <NewOrder setPage={setPage} />;
			break;
		case 'Create Event':
			return <CreateEvent setPage={setPage} setEvent={setEvent} />;
			break;
		default:
			return (
				<div>
					<div style={{ float: 'right' }}>
						{connectionStatus === 'Online' ? (
							<Button
								variant='contained'
								className={classes.button}
								style={{
									backgroundColor: '#4caf50',
									color: 'white',
								}}
								disabled={true}
								onClick={() => setPage('New Order')}
							>
								Online
							</Button>
						) : (
							<Button
								variant='contained'
								className={classes.button}
								style={{ backgroundColor: '#f44336', color: 'white' }}
								disabled={true}
							>
								Offline
							</Button>
						)}
					</div>
					<MainWrapper className='main-wrapper'>
						<img src={Logo} alt='' />
						<div className='main-buttons'>
							{currentEvent ? (
								<Button
									variant='contained'
									className={classes.button}
									id='new-order-button'
									style={{ backgroundColor: '#b71c1c', color: 'white' }}
									onClick={() => setPage('New Order')}
								>
									New Order
								</Button>
							) : null}
							{currentEvent ? (
								<Button
									className={classes.button}
									id='end-event-button'
									style={{ backgroundColor: '#b71c1c', color: 'white' }}
									onClick={() => eventEnd()}
								>
									End Event
								</Button>
							) : (
								<Button
									className={classes.button}
									id='creat-event-button'
									style={{ backgroundColor: '#b71c1c', color: 'white' }}
									onClick={() => setPage('Create Event')}
								>
									Create Event
								</Button>
							)}
							{isDev() ? (
								<Button
									className={classes.button}
									id='customers-button'
									style={{
										display: isDev() ? 'inline-block' : 'none',
										backgroundColor: '#b71c1c',
										color: 'white',
									}}
								>
									Get Customers
								</Button>
							) : null}
						</div>
					</MainWrapper>
				</div>
			);
	}
};

export default withStyles(styles)(Home);
