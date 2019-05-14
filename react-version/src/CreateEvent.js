import classNames from 'classnames';
import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import useFormSubmit from './utils/CustomHooks';

const styles = theme => ({
	container: { display: 'flex', flexWrap: 'wrap' },
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	dense: {
		marginTop: 16,
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
	},
});

const CreateEvent = props => {
	const addEventToLocalStorage = () => {
		localStorage.setItem('Current Event', JSON.stringify(inputs));
		// console.log('Event Submitted');
	};

	const { inputs, handleSubmit, handleInputChange } = useFormSubmit(
		addEventToLocalStorage,
	);

	const { classes } = props;
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<TextField
					id='eventName'
					label='Event Name'
					variant='outlined'
					className={classNames(classes.textField, classes.dense)}
					name='eventName'
					onChange={handleInputChange}
				/>
			</div>
			<TextField
				id='venue'
				label='Venue'
				variant='outlined'
				className={classNames(classes.textField, classes.dense)}
				name='venue'
				onChange={handleInputChange}
			/>
			<div>
				<button
					className='red darken-4 btn waves-effect waves-light '
					type='submit'
				>
					Submit
				</button>
			</div>
		</form>
	);
};

export default withStyles(styles)(CreateEvent);
