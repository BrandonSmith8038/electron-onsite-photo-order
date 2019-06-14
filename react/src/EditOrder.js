import React, { useEffect, useState } from 'react';
import { MainWrapper, FormWrapper, FormRow } from './Layout';
import { PrimaryButton, BackButton, PrimarySwitch } from './components/Buttons';
import { FormHeading } from './components/Typography';
import { TextField, TextArea, SelectField } from './components/Inputs';
import { AutoComplete } from './components/AutoComplete';
import { Card } from './components/Card';
import useFormSubmit from './utils/CustomHooks';
import getDate from './utils/getDate';

const { ipcRenderer } = window.require('electron');

ipcRenderer.on('order-edited', (event, arg) => {
	const { firstName, lastName, total } = arg;
	const notification = {
		title: 'Order Edited',
		icon: '../../../assets/icons/png/24x24.png',
		body: `Order Edited | ${firstName} ${lastName} | $${total}`,
	};
	const successNotification = new Notification(
		notification.title,
		notification,
	);
});

const EditOrder = props => {
	const [customers, setCustomers] = useState([]);
	const [matches, setMatches] = useState([]);
	const [needAddress, setNeedAddress] = useState(true);
	const [selectError, setSelectError] = useState(false);
	const { currentOrder } = props;

	const {
		inputs,
		setInputs,
		handleAutoComplete,
		handleInputChange,
		handleEditOrder,
		handleSubmit,
	} = useFormSubmit(() => {
		newOrderSubmit();
	});

	useEffect(() => {
		ipcRenderer.send('getCustomers');
		setInputs(currentOrder);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const options = [
		{ value: 'Payment Method', placeholder: true },

		{
			value: 'Cash',
			selected: currentOrder.paymentMethod === 'Cash' ? 'selected' : null,
		},

		{
			value: 'Card',
			selected: currentOrder.paymentMethod === 'Card' ? 'selected' : null,
		},

		{
			value: 'Invoice',
			selected: currentOrder.paymentMethod === 'Invoice' ? 'selected' : null,
		},
	];
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
		ipcRenderer.send('create-order', inputs, 'edit');
		// Go back to the home page
		props.setPage('Home');
	};

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

		// handleAutoComplete('lastName', lastNameValue);
		// handleAutoComplete('firstName', firstNameValue);
		// handleAutoComplete('email', emailValue);
		// handleAutoComplete('phone', phoneValue);
	};

	//TODO Fix Hover Style For Form Submit Buttons
	return (
		<div>
			<MainWrapper>
				<BackButton onClick={() => props.setPage('Current Event')} />
				<FormWrapper onSubmit={handleSubmit} width='80%'>
					<Card>
						<FormRow>
							<FormHeading>Edit Order</FormHeading>
						</FormRow>
						<PrimarySwitch onChange={handleSwitchChange} checked={needAddress}>
							Need Address
						</PrimarySwitch>
						{/* <div
					style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(4,150px)',
					gridTemplateRows: '40px 40px 40px 60px 60px 40px',
					gridGap: 10,
					}}
					> */}
						<FormRow>
							<TextField
								id='date'
								placeHolder='Date'
								defaultValue={getDate()}
								name='date'
								disabled
								style={{
									marginBottom: '7px',
									justifySelf: 'center',
									textAlign: 'center',
									width: '25%',
								}}
							/>
						</FormRow>
						<FormRow>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									width: '100%',
								}}
							>
								<TextField
									id='firstName'
									name='firstName'
									disabled
									placeHolder='First Name'
									onChange={e => {
										handleInputChange(e);
									}}
									onKeyUp={() => searchCustomers()}
									onFocus={() => searchCustomers()}
									onClick={() => searchCustomers()}
									value={inputs.firstName ? inputs.firstName : ''}
									required
								/>
								{/* On Show If There Are Matches Stored In The Matches State */}
								{matches.length > 0 && !inputs.lastName ? (
									<Card>
										<AutoComplete>
											<div style={{ marginRight: 0 }}>
												{matches.map(match => (
													<li
														key={match.name}
														onClick={() => selectedMatch(match)}
													>
														{match.name}
													</li>
												))}
											</div>
										</AutoComplete>
									</Card>
								) : null}
							</div>

							<TextField
								id='lastName'
								name='lastName'
								disabled
								placeHolder='Last Name'
								onChange={handleInputChange}
								value={inputs.lastName ? inputs.lastName : ''}
								style={{ marginRight: 0, maxHeight: '53px' }}
								onClick={() => setMatches([])}
								onFocus={() => setMatches([])}
								required
							/>
						</FormRow>
						<FormRow>
							<TextField
								id='email'
								name='email'
								placeHolder='Email'
								onChange={handleInputChange}
								value={inputs.email ? inputs.email : ''}
								required
								style={{ width: '75%' }}
							/>
							<TextField
								id='phone'
								name='phone'
								placeHolder='Phone'
								value={inputs.phone ? inputs.phone : ''}
								onChange={handleInputChange}
								required
								style={{ marginRight: 0, width: '25%' }}
							/>
						</FormRow>
						{needAddress ? (
							<FormRow>
								<TextField
									id='street'
									name='street'
									value={inputs.street ? inputs.street : ''}
									placeHolder='Street'
									onChange={handleInputChange}
									style={{ width: '40%' }}
								/>
								<TextField
									id='city'
									name='city'
									value={inputs.city ? inputs.city : ''}
									placeHolder='City'
									onChange={handleInputChange}
									style={{ width: '20%' }}
								/>
								<TextField
									id='state'
									name='state'
									value={inputs.state ? inputs.state : ''}
									placeHolder='State'
									onChange={handleInputChange}
									maxLength='2'
									style={{ width: '15%' }}
								/>
								<TextField
									id='zip'
									name='zip'
									value={inputs.zip ? inputs.zip : ''}
									placeHolder='Zip'
									onChange={handleInputChange}
									maxLength='5'
									style={{
										marginRight: 0,
										width: '15%',
									}}
								/>{' '}
							</FormRow>
						) : null}
						<FormRow>
							<TextArea
								id='photos'
								name='photos'
								value={inputs.photos ? inputs.photos : ''}
								placeHolder='Photos'
								onChange={handleInputChange}
								style={{ width: '100%' }}
								required
							/>
							<TextArea
								id='notes'
								name='notes'
								value={inputs.notes ? inputs.notes : ''}
								placeHolder='Notes'
								style={{ marginRight: 0, width: '100%' }}
								onChange={handleInputChange}
							/>
						</FormRow>
						<FormRow>
							<SelectField
								name='paymentMethod'
								options={options}
								onChange={handleInputChange}
								value={inputs.paymentMethod ? inputs.paymentMethod : ''}
							/>
							<TextField
								id='total'
								name='total'
								value={inputs.total ? inputs.total : ''}
								placeHolder='Total'
								onChange={handleInputChange}
								style={{ marginRight: 0 }}
								required
							/>
						</FormRow>
						<FormRow>
							<PrimaryButton style={{ width: '30%', margin: '0 auto' }}>
								Submit
							</PrimaryButton>
						</FormRow>
					</Card>
				</FormWrapper>
			</MainWrapper>
		</div>
	);
};

export default EditOrder;
