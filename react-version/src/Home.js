import { withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import CreateEvent from './CreateEvent';
import Logo from './img/logo.png';
import NewOrder from './NewOrder';
import isDev from './utils/isDev';

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
	const { classes } = props;
	switch (currentPage) {
		case 'New Order':
			return <NewOrder setPage={setPage} />;
			break;
		case 'Create Event':
			return <CreateEvent setPage={setPage} />;
			break;
		default:
			return (
				<div>
					<MainWrapper className='main-wrapper'>
						<img src={Logo} alt='' />
						<div className='main-buttons'>
							<Button
								variant='contained'
								className={classes.button}
								id='new-order-button'
								style={{ backgroundColor: '#b71c1c', color: 'white' }}
								onClick={() => setPage('New Order')}
							>
								New Order
							</Button>
							<Button
								className={classes.button}
								id='event-button'
								style={{ backgroundColor: '#b71c1c', color: 'white' }}
								onClick={() => setPage('Create Event')}
							>
								Create Event
							</Button>
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
						</div>
					</MainWrapper>
				</div>
			);
	}
};

export default withStyles(styles)(Home);
