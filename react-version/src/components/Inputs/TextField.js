import React from 'react';
import styled from 'styled-components/macro';
import { primary, primaryAccent, hint, darkText } from '../Colors.js';
import PropTypes from 'prop-types';

const Input = styled.input`
	padding: 15px 10px;
	border-radius: 5px;
	font-size: 18px;
	border: 1px solid ${primary};
	transition: 0.5s;
	outline: none;

	&:focus {
		border: 2px solid ${primary};
		box-shadow: 10px 13px 29px -14px ${hint};
	}
	&::placeholder {
		color: ${hint};
		opacity: 40%;
	}
`;

const TextField = props => {
	return (
		<Input
			type='text'
			id={props.name}
			name={props.name}
			placeholder={props.placeHolder}
			onChange={props.onChange}
			required={props.required ? true : false}
			disabled={props.disabled ? true : false}
			maxLength={props.maxLength ? props.maxLength : null}
		/>
	);
};

TextField.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string.isRequired,
	placeHolder: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	maxLength: PropTypes.string,
};

export default TextField;
