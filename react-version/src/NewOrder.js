import classNames from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';

import Fab from '@material-ui/core/Fab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ArrowBack from '@material-ui/icons/ArrowBack';

import useFormSubmit from './utils/CustomHooks';
import getDate from './utils/getDate';

const { ipcRenderer } = window.require('electron');

// let formSubmitted = false;
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
	formWrapper: {
		display: 'flex',
		fleDirection: 'column',
		flexWrap: 'wrap',
		padding: 20,
	},
	autoComplete: {
		maxHeight: 200,
		overflowX: 'hidden',
		overflowY: 'visible',
		width: '100%',
		margin: 0,
		padding: 5,
	},
	autoCompleteItem: {
		listStyle: 'none',
		cursor: 'pointer',
		':hover': {
			color: '#b71c1c',
		},
	},
});

ipcRenderer.on('order-saved', (event, arg) => {
	const { firstName, lastName, total } = arg;
	const notification = {
		title: 'Order Saved....',
		icon: '../../../assets/icons/png/24x24.png',
		body: `New Order Saved | ${firstName} ${lastName} | $${total}`,
	};
	const successNotification = new Notification(
		notification.title,
		notification,
	);
});

const NewOrder = props => {
	const { classes } = props;
	const [customers, setCustomers] = useState([]);
	const [matches, setMatches] = useState([]);
	// When a new order is submitted
	const newOrderSubmit = () => {
		// Send a command to ipcmain to save the order as a json file
		ipcRenderer.send('create-order', inputs);
		// Go back to the home page
		props.setPage('Home');
	};

	const {
		inputs,
		handleAutoComplete,
		handleInputChange,
		handleSubmit,
	} = useFormSubmit(() => {
		newOrderSubmit();
	});

	// When the component loads tell the ipcMain to grab all the customers from the api
	useEffect(() => {
		ipcRenderer.send('getCustomers');
	}, []);
	// Once the IPCmain grabs all the customers from the api it sends them back to the componet so we can do something
	// with them.
	ipcRenderer.on('sendCustomers', (event, arg) => {
		// Create an array of all the the cusomers recieved
		setCustomers(JSON.parse(arg));
	});
	// Runs Every Time A Key Is Pressed In The First Name Field
	const searchCustomers = () => {
		// Make Sure The First Name FIeld Has Text
		if (inputs.firstName) {
			// Once Three Letters Have Been Entered
			if (inputs.firstName.length >= 3) {
				// Create an array of matches where the text entered in the first name field
				// Matches an entry in the customers array
				let customerMatches = customers.filter(customer => {
					const regex = new RegExp(`^${inputs.firstName}`, 'gi');
					// Return All The Matches
					return customer.name.match(regex);
				});
				// If the first name text fiield has at least 3 letters and there
				// is matches in the set the Matches state with the matches
				if (inputs.firstName.length >= 3 && customerMatches.length !== 0) {
					setMatches(customerMatches);
				}
			}
			// If there are less then three letters in the first name text field set the matches
			// state back to an empty array to clear the autocomplete
			if (inputs.firstName.length < 3) {
				setMatches([]);
			}
		}
	};
	const selectedMatch = customer => {
		const {
			name,
			contact: { email: emailValue, phone: phoneValue },
		} = customer;
		const firstNameValue = name
			.split(' ')
			.slice(0, -1)
			.join(' ');
		const lastNameValue = name
			.split(' ')
			.slice(-1)
			.join(' ');

		handleAutoComplete('lastName', lastNameValue);
		handleAutoComplete('firstName', firstNameValue);
		handleAutoComplete('email', emailValue);
		handleAutoComplete('phone', phoneValue);
	};

	return (
		<div className={classes.formWrapper}>
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
			<form onSubmit={handleSubmit}>
				<TextField
					id='date'
					label='Date'
					variant='outlined'
					className={classNames(classes.textField, classes.dense)}
					InputProps={{
						readOnly: true,
					}}
					defaultValue={getDate()}
					name='date'
				/>
				<div>
					<TextField
						id='firstName'
						name='firstName'
						label='First Name'
						variant='outlined'
						className={classNames(classes.textField, classes.dense)}
						onChange={e => {
							handleInputChange(e);
						}}
						onKeyUp={() => searchCustomers()}
						value={inputs.firstName ? inputs.firstName : ''}
						required={true}
					/>
					{/* On Show If There Are Matches Stored In The Matches State */}
					{matches && !inputs.lastName ? (
						<div className={classes.autoComplete}>
							{matches.map(match => (
								<li
									className={classes.autoCompleteItem}
									key={match.name}
									onClick={() => selectedMatch(match)}
								>
									{match.name}
								</li>
							))}
						</div>
					) : null}
				</div>
				<TextField
					id='lastName'
					name='lastName'
					label='Last Name'
					variant='outlined'
					className={classNames(classes.textField, classes.dense)}
					onChange={handleInputChange}
					value={inputs.lastName ? inputs.lastName : ''}
					required={true}
				/>
				<TextField
					id='email'
					name='email'
					label='Email'
					variant='outlined'
					className={classNames(classes.textField, classes.dense)}
					onChange={handleInputChange}
					value={inputs.email ? inputs.email : ''}
					required={true}
				/>
				<TextField
					id='phone'
					name='phone'
					label='Phone'
					variant='outlined'
					className={classNames(classes.textField, classes.dense)}
					value={inputs.phone ? inputs.phone : ''}
					onChange={handleInputChange}
					required={true}
				/>
				<TextField
					id='street'
					name='street'
					defaultValue={inputs.street}
					label='Street'
					variant='outlined'
					className={classNames(classes.textField, classes.dense)}
					onChange={handleInputChange}
				/>
				<TextField
					id='city'
					name='city'
					defaultValue={inputs.city}
					label='City'
					variant='outlined'
					className={classNames(classes.textField, classes.dense)}
					onChange={handleInputChange}
				/>
				<TextField
					id='state'
					name='state'
					defaultValue={inputs.state}
					label='State'
					variant='outlined'
					className={classNames(classes.textField, classes.dense)}
					onChange={handleInputChange}
				/>
				<TextField
					id='zip'
					name='zip'
					defaultValue={inputs.zip}
					label='Zip'
					variant='outlined'
					className={classNames(classes.textField, classes.dense)}
					onChange={handleInputChange}
				/>
				<TextField
					id='photos'
					name='photos'
					defaultValue={inputs.photos}
					label='Photos'
					variant='outlined'
					multiline={true}
					rowsMax={4}
					className={classNames(classes.textField, classes.dense)}
					onChange={handleInputChange}
					required={true}
				/>
				<TextField
					id='notes'
					name='notes'
					defaultValue={inputs.notes}
					label='Notes'
					variant='outlined'
					multiline={true}
					rowsMax={4}
					className={classNames(classes.textField, classes.dense)}
					onChange={handleInputChange}
				/>
				<InputLabel htmlFor='payment-method'>Payment Method</InputLabel>
				<Select
					value={inputs.paymentMethod ? inputs.paymentMethod : ''}
					name='paymentMethod'
					onChange={handleInputChange}
					inputProps={{
						name: 'paymentMethod',
						id: 'paymentMethod',
					}}
				>
					<MenuItem value=''>
						<em>Payment Method</em>
					</MenuItem>
					<MenuItem value='Cash'>Cash</MenuItem>
					<MenuItem value='Card'>Card</MenuItem>
					<MenuItem value='Invoice'>Invoice</MenuItem>
				</Select>
				<TextField
					id='total'
					name='total'
					defaultValue={inputs.total}
					label='total'
					variant='outlined'
					className={classNames(classes.textField, classes.dense)}
					onChange={handleInputChange}
					required={true}
				/>
				<button
					className='red darken-4 btn waves-effect waves-light '
					type='submit'
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default withStyles(styles)(NewOrder);
