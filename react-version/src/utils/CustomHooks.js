import React, { useState } from 'react';

const useOrderForm = callback => {
	const [inputs, setInputs] = useState({});

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

	const handleSelectChange = e => {
		setInputs(inputs => ({
			...inputs,
			paymentMethod: e.target.value,
		}));
	};

	return {
		handleSubmit,
		handleInputChange,
		handleSelectChange,
		inputs,
	};
};

export default useOrderForm;
