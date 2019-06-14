import { useState } from 'react';

import getDate from './getDate';

const useFormSubmit = callback => {
	const [inputs, setInputs] = useState({
		date: getDate(),
	});

	const handleSubmit = e => {
		if (e) {
			e.preventDefault();
		}
		callback();
	};

	const handleInputChange = e => {
		e.persist();
		setInputs(inputs => ({
			...inputs,
			[e.target.name]: e.target.value,
		}));
	};

	const handleAutoComplete = (inputField, newValue) => {
		setInputs(inputs => ({
			...inputs,
			[inputField]: newValue,
		}));
	};
	const handleEditOrder = (inputField, newValue) => {
		setInputs(inputs => ({
			...inputs,
			[inputField]: newValue,
		}));
	};
	return {
		setInputs,
		handleSubmit,
		handleEditOrder,
		handleInputChange,
		handleAutoComplete,
		inputs,
	};
};

export default useFormSubmit;
