import classNames from 'classnames';
import React, { Fragment } from 'react';

import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ArrowBack from '@material-ui/icons/ArrowBack';

import useFormSubmit from './utils/CustomHooks';

const styles = theme => ({
	container: { display: 'flex', flexWrap: 'wrap' },
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	fab: {
		margin: theme.spacing.unit,
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
		props.setEvent(inputs);
		props.setPage('Home');
	};

	const { inputs, handleSubmit, handleInputChange } = useFormSubmit(
		addEventToLocalStorage,
	);

	const { classes, setEvents, setPage } = props;
	return (
		<>
			<div style={{ float: 'left', clear: 'both', marginBottom: 50 }}>
				<Fab
					color='primary'
					aria-label='back'
					className={classes.fab}
					size='small'
					onClick={() => props.setPage('Home')}
					style={{
						backgroundColor: '#b71c1c',
						color: 'white',
					}}
				>
					<ArrowBack />
				</Fab>
			</div>
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
		</>
	);
};

export default withStyles(styles)(CreateEvent);
