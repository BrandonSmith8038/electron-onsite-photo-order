import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { Fragment } from 'react';

import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ArrowBack from '@material-ui/icons/ArrowBack';

import { MainWrapper } from './components/Layout';
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
	redLabel: {
		color: theme.palette.primary.main,
		'&$cssFocused': {
			color: theme.palette.primary.main,
		},
	},
	cssOutlinedInput: {
		'&$cssFocused $notchedOutline': {
			borderColor: `${theme.palette.primary.main} !important`,
		},
	},

	cssFocused: {},

	notchedOutline: {
		borderWidth: '1px',
		borderColor: '#333 !important',
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

	const { classes } = props;
	console.log(props);
	console.log(inputs);
	return (
		<>
			<div style={{ float: 'left', clear: 'both' }}>
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
			<MainWrapper>
				<Typography variant='h4' gutterBottom>
					New Event
				</Typography>
				<form onSubmit={handleSubmit}>
					<div>
						<TextField
							color='textSecondary'
							id='eventName'
							label='Event Name'
							variant='outlined'
							className={classNames(classes.textField, classes.dense)}
							InputLabelProps={{
								classes: {
									root: classes.redLabel,
									focused: classes.cssFocused,
								},
							}}
							InputProps={{
								classes: {
									root: classes.cssOutlinedInput,
									focused: classes.cssFocused,
									notchedOutline: classes.notchedOutline,
								},
							}}
							name='eventName'
							onChange={handleInputChange}
						/>
					</div>
					<TextField
						id='venue'
						label='Venue'
						variant='outlined'
						className={classNames(classes.textField, classes.dense)}
						InputLabelProps={{
							classes: {
								root: classes.redLabel,
								focused: classes.cssFocused,
							},
						}}
						InputProps={{
							classes: {
								root: classes.cssOutlinedInput,
								focused: classes.cssFocused,
								notchedOutline: classes.notchedOutline,
							},
						}}
						name='venue'
						onChange={handleInputChange}
					/>
					<div>
						<Button
							type='submit'
							color='primary'
							variant='contained'
							className={classes.dense}
						>
							Submit
						</Button>
					</div>
				</form>
			</MainWrapper>
		</>
	);
};

export default withStyles(styles)(CreateEvent);
