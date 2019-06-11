import React from 'react';

import { MainWrapper, HomeButtonWrapper } from './Layout';
import { PrimaryButton, ConnectionStatusButton } from './components/Buttons';
import Logo from './img/logo.png';

const Home = props => {
	const { connectionStatus, setPage, currentEvent, eventEnd } = props;

	return (
		<div>
			<MainWrapper>
				<ConnectionStatusButton
					setPage={setPage}
					connectionStatus={connectionStatus}
				/>
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
