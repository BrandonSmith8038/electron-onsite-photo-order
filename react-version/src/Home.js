import { withStyles } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import ConnectionStatusButton from './components/ConnectionStatusButton';
import { MainWrapper } from './components/Layout';
import CreateEvent from './CreateEvent';
import Logo from './img/logo.png';
import NewOrder from './NewOrder';
import isDev from './utils/isDev';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
	},
});

const Home = props => {
	const {
		classes,
		connectionStatus,
		currentPage,
		setPage,
		currentEvent,
		setEvent,
		eventEnd,
	} = props;

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
