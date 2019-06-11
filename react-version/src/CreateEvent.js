import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { Fragment } from 'react';

import { MainWrapper, FormWrapper, FormRow } from './Layout';
import { BackButton, PrimaryButton } from './components/Buttons';
import { TextField } from './components/Inputs';
import { FormHeading } from './components/Typography';
import { Card } from './components/Card';
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
			<MainWrapper>
				<BackButton onClick={() => props.setPage('Home')} />

				<FormWrapper onSubmit={handleSubmit} width='80%'>
					<Card>
						<FormRow>
							<FormHeading>New Event</FormHeading>
						</FormRow>
						<FormRow>
							<TextField
								id='venue'
								placeHolder='Venue'
								name='venue'
								onChange={handleInputChange}
							/>
						</FormRow>
						<FormRow>
							<TextField
								color='textSecondary'
								id='eventName'
								placeHolder='Event Name'
								name='eventName'
								onChange={handleInputChange}
							/>
						</FormRow>
						<FormRow>
							<PrimaryButton>Submit</PrimaryButton>
						</FormRow>
					</Card>
				</FormWrapper>
			</MainWrapper>
		</>
	);
};

export default CreateEvent;
