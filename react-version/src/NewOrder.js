import React, { useState } from 'react';
import classNames from 'classnames';
import getDate from './utils/getDate';
import useOrderForm from './utils/CustomHooks';

import Home from './Home';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const { ipcRenderer } = window.require('electron');

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

const NewOrder = props => {
	const { classes } = props;

	const newOrderSubmit = () => {
		ipcRenderer.send('create-order', inputs);
	};

	const { currentPage, setPage } = useState('New Order');
	const { inputs, handleInputChange, handleSubmit } = useOrderForm(() => {
		newOrderSubmit();
	});
	switch (currentPage) {
		case 'Home':
			return <Home />;
			break;
		default:
			return (
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

					<TextField
						id='firstName'
						name='firstName'
						label='First Name'
						variant='outlined'
						className={classNames(classes.textField, classes.dense)}
						onChange={handleInputChange}
						defaultValue={inputs.firsName}
					/>

					<TextField
						id='lastName'
						name='lastName'
						label='Last Name'
						defaultValue={inputs.lastName}
						variant='outlined'
						className={classNames(classes.textField, classes.dense)}
						onChange={handleInputChange}
					/>

					<TextField
						id='email'
						name='email'
						defaultValue={inputs.email}
						label='Email'
						variant='outlined'
						className={classNames(classes.textField, classes.dense)}
						onChange={handleInputChange}
					/>

					<TextField
						id='phone'
						name='phone'
						defaultValue={inputs.phone}
						label='Phone'
						variant='outlined'
						className={classNames(classes.textField, classes.dense)}
						onChange={handleInputChange}
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
					/>

					<button
						className='red darken-4 btn waves-effect waves-light '
						type='submit'
					>
						Submit
					</button>
				</form>
			);
	}
};

export default withStyles(styles)(NewOrder);
