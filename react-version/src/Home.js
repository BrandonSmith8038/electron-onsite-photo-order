import { withStyles } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import ConnectionStatusButton from './components/ConnectionStatusButton';
import CreateEvent from './CreateEvent';
import Logo from './img/logo.png';
import NewOrder from './NewOrder';
import isDev from './utils/isDev';

const { ipcRenderer } = window.require('electron');

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
	},
});

const MainWrapper = styled.div`
	display: flex;
	height: 100vh;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

const Home = props => {
	const [currentPage, setPage] = useState('Home');
	const [currentEvent, setEvent] = useState('');

	useEffect(() => {
		const currentEvent = localStorage.getItem('Current Event');
		if (currentEvent) {
			setEvent(JSON.parse(currentEvent));
		}
	}, []);

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

	const { classes, connectionStatus } = props;
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
					<ConnectionStatusButton
						setPage={setPage}
						connectionStatus={connectionStatus}
					/>
					<MainWrapper className='main-wrapper'>
						<img src={Logo} alt='' />
						<div className='main-buttons'>
							{currentEvent ? (
								<>
									<Button
										className={classes.button}
										variant='contained'
										id='new-order-button'
										color='primary'
										onClick={() => setPage('New Order')}
									>
										New Order
									</Button>
								</>
							) : null}
							{currentEvent ? (
								<Button
									className={classes.button}
									variant='contained'
									color='primary'
									onClick={() => eventEnd()}
								>
									End Event
								</Button>
							) : (
								<Button
									className={classes.button}
									id='creat-event-button'
									color='primary'
									variant='contained'
									onClick={() => setPage('Create Event')}
								>
									Create Event
								</Button>
							)}
							{isDev() ? (
								<Button
									className={classes.button}
									id='customers-button'
									color='primary'
									variant='contained'
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
