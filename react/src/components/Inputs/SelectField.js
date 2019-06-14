import React from 'react';
import styled from 'styled-components/macro';
import { primary, hint } from '../Colors.js';

const Select = styled.select`
	background: none;
	border: 1px solid ${primary};
	border-radius: 5px;
	color: ${hint};
	font-size: 18px;
	padding: 15px 10px;
	outline: none;
	width: 100%;

	&:focus {
		border: 2px solid ${primary};
		box-shadow: 10px 13px 29px -14px ${hint};
	}
	option {
		color: ${primary};
		border: 1px solid ${primary};
		outline: none;
	}
`;

const SelectField = props => {
	const options = props.options.map(option => {
		const { value, placeholder, editPage, selected } = option;

		return (
			<option
				// disabled={option.disabled ? true : false}
				key={value}
				value={placeholder ? null : value}
				style={{ color: placeholder ? hint : null }}
				selected={selected}
			>
				{value}
			</option>
		);
	});
	return (
		<Select onChange={props.onChange} name={props.name} style={props.style}>
			{options}
		</Select>
	);
};

export default SelectField;
