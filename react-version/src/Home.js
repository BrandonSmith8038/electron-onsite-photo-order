import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import styled from 'styled-components';
import Logo from './img/logo.png';
import isDev from './utils/isDev';
import NewOrder from './NewOrder';

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
			return <NewOrder />;
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
							>
								Create Event
							</Button>
							<Button
								className={classes.button}
								id='customers-button'
								style={{
									display: isDev() ? 'none' : 'inline-block',
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
