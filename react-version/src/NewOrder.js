import React, { useState } from 'react';
import Home from './Home';

const NewOrder = () => {
	const { currentPage, setPage } = useState('New Order');
	switch (currentPage) {
		case 'Home':
			return <Home />;
			break;
		default:
			return (
				<div class='col s12 form-wrapper'>
					<form>
						<div class='row'>
							<div class='input-field col s6'>
								<input type='text' id='date' readonly />
								<label class='active' for='date'>
									Date
								</label>
							</div>
						</div>
						<div class='row'>
							<div class='input-field col s3 '>
								<input
									type='text'
									id='first-name'
									class='first-name'
									required
								/>
								<label for='first-name'>First Name</label>
								<div class='auto-complete card' />
							</div>
							<div class='input-field col s3'>
								<input type='text' id='last-name' required />
								<label for='last-name'>Last Name</label>
							</div>
							<div class='input-field col s3'>
								<input type='text' id='email' />
								<label for='email'>Email</label>
							</div>
							<div class='input-field col s3'>
								<input type='text' id='phone' />
								<label for='phone'>Phone Number</label>
							</div>
						</div>
						<div class='row'>
							<div class='input-field col s3'>
								<input type='text' id='street' />
								<label for='street'>Street</label>
							</div>
							<div class='input-field col s3'>
								<input type='text' id='city' /> <label for='city'>City</label>
							</div>
							<div class='input-field col s3'>
								<input type='text' id='state' />{' '}
								<label for='state'>State</label>
							</div>
							<div class='input-field col s3'>
								<input type='text' id='zip' /> <label for='zip'>Zip</label>
							</div>
						</div>
						<div class='row'>
							<div class='input-field col s6'>
								<textarea class='materialize-textarea' id='photos' required />
								<label for='photos'>Photos</label>
							</div>
							<div class='input-field col s6'>
								<textarea class='materialize-textarea' id='notes' />
								<label for='notes'>Notes</label>
							</div>
						</div>
						<div class='row'>
							<div class='input-field col s3'>
								<select id='payment-method'>
									<option value='' disabled selected>
										Payment Method
									</option>
									<option value='Cash'>Cash</option>
									<option value='Card'>Card</option>
									<option value='Invoice'>Invoice</option>
								</select>
								<label>Payment Method</label>
							</div>
							<div class='input-field col s2'>
								<input type='text' id='total' required />{' '}
								<label for='total'>Total</label>
							</div>
						</div>

						<button
							class='red darken-4 btn waves-effect waves-light '
							type='submit'
						>
							Submit
						</button>
					</form>
				</div>
			);
	}
};

export default NewOrder;
