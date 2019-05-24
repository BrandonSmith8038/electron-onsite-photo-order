import React, { Fragment, useEffect, useState } from 'react';

import ConnectionStatusButton from './components/ConnectionStatusButton';
import { MainWrapper } from './Layout';
import CreateEvent from './CreateEvent';
import { PrimaryButton } from './components/Buttons';
import Logo from './img/logo.png';
import NewOrder from './NewOrder';
import isDev from './utils/isDev';

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
									<PrimaryButton
										variant='contained'
										id='new-order-button'
										color='primary'
										onClick={() => setPage('New Order')}
									>
										New Order
									</PrimaryButton>
								</>
							) : null}
							{currentEvent ? (
								<button
									variant='contained'
									color='primary'
									onClick={() => eventEnd()}
								>
									End Event
								</button>
							) : (
								<button
									id='creat-event-button'
									color='primary'
									variant='contained'
									onClick={() => setPage('Create Event')}
								>
									Create Event
								</button>
							)}
							{isDev() ? (
								<button
									id='customers-button'
									color='primary'
									variant='contained'
								>
									Get Customers
								</button>
							) : null}
						</div>
					</MainWrapper>
				</div>
			);
	}
};

export default Home;
