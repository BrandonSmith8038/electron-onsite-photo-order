import { FormControl } from '@material-ui/core';
import classNames from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';

import useFormSubmit from './utils/CustomHooks';
import getDate from './utils/getDate';

const { ipcRenderer } = window.require('electron');

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
			<button
				aria-label='back'
				size='small'
				onClick={() => props.setPage('Home')}
				style={{
					backgroundColor: '#b71c1c',
					color: 'white',
					float: 'left',
					clear: 'both',
				}}
			>
				BACK
			</button>
			<main>
				<form onSubmit={handleSubmit}>
					<button onChange={handleSwitchChange}>Need Address</button>
					<input id='date' label='Date' defaultValue={getDate()} name='date' />
					<div>
						<input
							id='firstName'
							name='firstName'
							label='First Name'
							onChange={e => {
								handleInputChange(e);
							}}
							onKeyUp={() => searchCustomers()}
							value={inputs.firstName ? inputs.firstName : ''}
							required={true}
						/>
						{/* On Show If There Are Matches Stored In The Matches State */}
						{matches && !inputs.lastName ? (
							<div>
								{matches.map(match => (
									<li key={match.name} onClick={() => selectedMatch(match)}>
										{match.name}
									</li>
								))}
							</div>
						) : null}
					</div>

					<input
						id='lastName'
						name='lastName'
						label='Last Name'
						onChange={handleInputChange}
						value={inputs.lastName ? inputs.lastName : ''}
						required={true}
					/>
					<input
						id='email'
						name='email'
						label='Email'
						onChange={handleInputChange}
						value={inputs.email ? inputs.email : ''}
						required={true}
					/>
					<input
						id='phone'
						name='phone'
						label='Phone'
						value={inputs.phone ? inputs.phone : ''}
						onChange={handleInputChange}
						required={true}
					/>
					{needAddress ? (
						<>
							<input
								id='street'
								name='street'
								defaultValue={inputs.street}
								label='Street'
								onChange={handleInputChange}
							/>
							<input
								id='city'
								name='city'
								defaultValue={inputs.city}
								label='City'
								onChange={handleInputChange}
							/>
							<input
								id='state'
								name='state'
								defaultValue={inputs.state}
								label='State'
								onChange={handleInputChange}
							/>
							<input
								id='zip'
								name='zip'
								defaultValue={inputs.zip}
								label='Zip'
								onChange={handleInputChange}
							/>{' '}
						</>
					) : null}
					<input
						id='photos'
						fullWidth
						name='photos'
						defaultValue={inputs.photos}
						label='Photos'
						onChange={handleInputChange}
					/>
					<input
						id='notes'
						name='notes'
						fullWidth
						defaultValue={inputs.notes}
						label='Notes'
						onChange={handleInputChange}
					/>

					<select
						value={inputs.paymentMethod ? inputs.paymentMethod : ''}
						name='paymentMethod'
						onChange={handleInputChange}
					>
						<option value='Cash'>Cash</option>
						<option value='Card'>Card</option>
						<option value='Invoice'>Invoice</option>
					</select>
					<input
						id='total'
						name='total'
						defaultValue={inputs.total}
						label='Total'
						onChange={handleInputChange}
						required={true}
					/>
					<button type='submit' style={{ width: '50%' }}>
						Submit
					</button>
				</form>
			</main>
		</>
	);
};

export default NewOrder;
