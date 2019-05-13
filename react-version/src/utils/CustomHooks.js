import React, { useState } from 'react';
import getDate from './getDate';

const useOrderForm = callback => {
	const [inputs, setInputs] = useState({ date: getDate() });

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

	return {
		handleSubmit,
		handleInputChange,
		inputs,
	};
};

export default useOrderForm;
