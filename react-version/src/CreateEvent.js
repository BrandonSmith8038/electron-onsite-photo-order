import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { Fragment } from 'react';

import { MainWrapper } from './Layout';
import useFormSubmit from './utils/CustomHooks';

const CreateEvent = props => {
	const addEventToLocalStorage = () => {
		localStorage.setItem('Current Event', JSON.stringify(inputs));
		props.setEvent(inputs);
		props.setPage('Home');
	};

	const { inputs, handleSubmit, handleInputChange } = useFormSubmit(
		addEventToLocalStorage,
	);

	const { classes } = props;
	console.log(props);
	console.log(inputs);
	return (
		<>
			<div style={{ float: 'left', clear: 'both' }}>
				<button
					onClick={() => props.setPage('Home')}
					style={{
						backgroundColor: '#b71c1c',
						color: 'white',
					}}
				>
					Back
				</button>
			</div>
			<MainWrapper>
				<h4>New Event</h4>
				<form onSubmit={handleSubmit}>
					<div>
						<input
							color='textSecondary'
							id='eventName'
							label='Event Name'
							name='eventName'
							onChange={handleInputChange}
						/>
					</div>
					<input
						id='venue'
						label='Venue'
						variant='outlined'
						name='venue'
						onChange={handleInputChange}
					/>
					<div>
						<button type='submit'>Submit</button>
					</div>
				</form>
			</MainWrapper>
		</>
	);
};

export default CreateEvent;
