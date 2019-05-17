import { FormControl } from '@material-ui/core';
import classNames from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import Fab from '@material-ui/core/Fab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import ArrowBack from '@material-ui/icons/ArrowBack';

import useFormSubmit from './utils/CustomHooks';
import getDate from './utils/getDate';

const { ipcRenderer } = window.require('electron');

// let formSubmitted = false;
const styles = theme => ({
	layout: {
		width: 'auto',
		height: '100vh',
		// marginLeft: theme.spacing.unit * 4,
		// marginRight: theme.spacing.unit * 4,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: '50%',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	select: {
		'&:before': {
			borderColor: red[900],
		},
		'&:after': {
			borderColor: red[900],
		},
	},
	paper: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		width: '70%',
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
	// Switch Customization
	customSwitch: {
		color: grey[700],
		colorBar: red[900],
		'&$colorChecked': {
			color: red[900],
			'& + $colorBar': {
				backgroundColor: red[900],
			},
		},
	},
	colorBar: {},
	colorChecked: {},
	autoComplete: {
		maxHeight: 200,
		overflowX: 'hidden',
		overflowY: 'visible',
		width: '100%',
		margin: 0,
		padding: 5,
	},
	// Text Field Label Color
	redLabel: {
		'&$cssFocused': {
			color: red[900],
		},
	},
	// Button Background Color
	redButton: {
		width: '50%',
		color: 'white',
		backgroundColor: red[800],
		'&:hover': {
			backgroundColor: red[900],
		},
	},
	// Textfield Colors
	cssOutlinedInput: {
		'&$cssFocused $notchedOutline': {
			borderColor: `#b71c1c !important`,
		},
	},

	cssFocused: {},

	notchedOutline: {
		borderWidth: '1px',
		borderColor: '#333 !important',
	},
	autoCompleteItem: {
		listStyle: 'none',
		cursor: 'pointer',
		'&:hover': {
			color: '#b71c1c',
		},
	},
	Paper: { background: 'red' },

	formLabelRoot: {
		// must provide all of formLabelRoot && '&$formLabelFocused' && formLabelFocused
		'&$formLabelFocused': { color: red[900] },
	},
	formLabelFocused: {
		// color: 'green', // won't affect anything
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
	const [needAddress, setNeedAddress] = useState(false);
	const [selectError, setSelectError] = useState(false);
	// When a new order is submitted
	const newOrderSubmit = () => {
		if (!inputs.paymentMethod) {
			// If Payment Method Is Not Selected, display in error state for two seconds
			setSelectError(true);
			setTimeout(() => {
				setSelectError(false);
			}, 2000);
			return;
		}
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

	const handleSwitchChange = () => {
		setNeedAddress(!needAddress);
	};
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
		<>
			<Fab
				color='primary'
				aria-label='back'
				className={classes.fab}
				size='small'
				onClick={() => props.setPage('Home')}
				style={{
					backgroundColor: '#b71c1c',
					color: 'white',
					float: 'left',
					clear: 'both',
				}}
			>
				<ArrowBack />
			</Fab>
			<main className={classes.layout}>
				<Paper className={classes.paper} elevation={8}>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={8}>
							<Grid item xs={3} alignItems='flex-end'>
								<FormControlLabel
									control={
										<Switch
											classes={{
												switchBase: classes.customSwitch,
												checked: classes.colorChecked,
												bar: classes.colorBar,
											}}
											value='address-needed'
											checked={needAddress}
											onChange={handleSwitchChange}
										/>
									}
									label='Need Address'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id='date'
									label='Date'
									variant='outlined'
									className={classNames(classes.textField, classes.dense)}
									InputLabelProps={{
										classes: {
											root: classes.redLabel,
											focused: classes.cssFocused,
										},
									}}
									InputProps={{
										readOnly: true,
										classes: {
											root: classes.cssOutlinedInput,
											focused: classes.cssFocused,
											notchedOutline: classes.notchedOutline,
										},
									}}
									defaultValue={getDate()}
									name='date'
								/>
							</Grid>
							<Grid item xs={6}>
								<div>
									<TextField
										id='firstName'
										name='firstName'
										label='First Name'
										variant='outlined'
										fullWidth
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
										onChange={e => {
											handleInputChange(e);
										}}
										onKeyUp={() => searchCustomers()}
										value={inputs.firstName ? inputs.firstName : ''}
										required={true}
										style={{ borderColor: 'pink' }}
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
							</Grid>

							<Grid item xs={6}>
								<TextField
									id='lastName'
									name='lastName'
									label='Last Name'
									variant='outlined'
									fullWidth
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
									onChange={handleInputChange}
									value={inputs.lastName ? inputs.lastName : ''}
									required={true}
								/>
							</Grid>
							<Grid item xs={9}>
								<TextField
									id='email'
									name='email'
									label='Email'
									fullWidth
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
									onChange={handleInputChange}
									value={inputs.email ? inputs.email : ''}
									required={true}
								/>
							</Grid>
							<Grid item xs={3}>
								<TextField
									id='phone'
									name='phone'
									label='Phone'
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
									value={inputs.phone ? inputs.phone : ''}
									onChange={handleInputChange}
									required={true}
								/>
							</Grid>

							{needAddress ? (
								<>
									<Grid item sm={5} xs={6}>
										<TextField
											id='street'
											name='street'
											defaultValue={inputs.street}
											label='Street'
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
											onChange={handleInputChange}
										/>
									</Grid>
									<Grid item sm={3} xs={6}>
										<TextField
											id='city'
											name='city'
											defaultValue={inputs.city}
											label='City'
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
											onChange={handleInputChange}
										/>
									</Grid>
									<Grid item xs={6} sm={2}>
										<TextField
											id='state'
											name='state'
											defaultValue={inputs.state}
											label='State'
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
											// eslint-disable-next-line react/jsx-no-duplicate-props
											inputProps={{
												maxLength: 2,
											}}
											onChange={handleInputChange}
										/>
									</Grid>
									<Grid item xs={6} sm={2}>
										<TextField
											id='zip'
											name='zip'
											defaultValue={inputs.zip}
											label='Zip'
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
											// eslint-disable-next-line react/jsx-no-duplicate-props
											inputProps={{
												maxLength: 5,
											}}
											onChange={handleInputChange}
										/>{' '}
									</Grid>
								</>
							) : null}
							<Grid item xs={6}>
								<TextField
									id='photos'
									fullWidth
									name='photos'
									defaultValue={inputs.photos}
									label='Photos'
									variant='outlined'
									multiline={true}
									rows={4}
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
									onChange={handleInputChange}
									required={true}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id='notes'
									name='notes'
									fullWidth
									defaultValue={inputs.notes}
									label='Notes'
									variant='outlined'
									multiline={true}
									rows={4}
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
									onChange={handleInputChange}
								/>
							</Grid>
							<Grid item xs={6}>
								<FormControl
									className={classes.formControl}
									error={selectError}
								>
									<InputLabel
										htmlFor='payment-method'
										// style={{ ':hover': { color: 'pink' } }}
										FormLabelClasses={{
											root: classes.formLabelRoot,
											focused: classes.formLabelFocused,
										}}
									>
										Payment Method
									</InputLabel>
									<Select
										value={inputs.paymentMethod ? inputs.paymentMethod : ''}
										name='paymentMethod'
										className={classes.select}
										onChange={handleInputChange}
										inputProps={{
											name: 'paymentMethod',
											id: 'paymentMethod',
										}}
									>
										<MenuItem value='Cash'>Cash</MenuItem>
										<MenuItem value='Card'>Card</MenuItem>
										<MenuItem value='Invoice'>Invoice</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id='total'
									name='total'
									defaultValue={inputs.total}
									label='Total'
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
										startAdornment: (
											<InputAdornment position='start'>$</InputAdornment>
										),
									}}
									onChange={handleInputChange}
									required={true}
								/>
							</Grid>
							<Grid item xs={12}>
								<Button
									className={classNames(classes.redButton)}
									type='submit'
									variant='contained'
									fullWidth
								>
									Submit
								</Button>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</main>
		</>
	);
};

export default withStyles(styles)(NewOrder);
