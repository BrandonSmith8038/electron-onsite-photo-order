import React from 'react';

import ConnectionStatusButton from './components/ConnectionStatusButton';
import { MainWrapper, HomeButtonWrapper } from './Layout';
import { PrimaryButton } from './components/Buttons';
import Logo from './img/logo.png';

const Home = props => {
	const { connectionStatus, setPage, currentEvent, eventEnd } = props;

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
								id='new-order-button'
								onClick={() => setPage('New Order')}
							>
								New Order
							</PrimaryButton>
						</>
					) : null}
					{currentEvent ? (
						<PrimaryButton id='end-event-button' onClick={() => eventEnd()}>
							End Event
						</PrimaryButton>
					) : (
						<PrimaryButton
							id='creat-event-button'
							onClick={() => setPage('Create Event')}
						>
							Create Event
						</PrimaryButton>
					)}
				</HomeButtonWrapper>
			</MainWrapper>
		</div>
	);
};
export default Home;
