import React, { Fragment, useEffect, useState } from 'react';

import ConnectionStatusButton from './components/ConnectionStatusButton';
import { MainWrapper, HomeButtonWrapper } from './Layout';
import CreateEvent from './CreateEvent';
import { PrimaryButton } from './components/Buttons';
import Logo from './img/logo.png';
import NewOrder from './NewOrder';
import isDev from './utils/isDev';

import TextField from './components/Inputs/TextField';

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

	return (
		<div>
			<ConnectionStatusButton
				setPage={setPage}
				connectionStatus={connectionStatus}
			/>
			<MainWrapper>
				<img src={Logo} alt='' />
				<HomeButtonWrapper>
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
						<PrimaryButton
							variant='contained'
							color='primary'
							onClick={() => eventEnd()}
						>
							End Event
						</PrimaryButton>
					) : (
						<PrimaryButton
							id='creat-event-button'
							color='primary'
							variant='contained'
							onClick={() => setPage('Create Event')}
						>
							Create Event
						</PrimaryButton>
					)}
					{isDev() ? (
						<PrimaryButton
							id='customers-button'
							color='primary'
							variant='contained'
						>
							Get Customers
						</PrimaryButton>
					) : null}
				</HomeButtonWrapper>
			</MainWrapper>
		</div>
	);
};
export default Home;
