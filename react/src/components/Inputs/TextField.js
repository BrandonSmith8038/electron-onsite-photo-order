import React from 'react';
import styled from 'styled-components/macro';
import { primary, hint } from '../Colors.js';
import PropTypes from 'prop-types';

const Input = styled.input`
	padding: 15px 10px;
	border-radius: 5px;
	font-size: 18px;
	font-family: 'Roboto', Fallback, sans-serif;
	border: 1px solid ${primary};
	transition: 0.5s;
	outline: none;
	width: 100%;
	&:focus {
		border: 2px solid ${primary};
		box-shadow: 10px 13px 29px -14px ${hint};
	}
	&::placeholder {
		color: ${hint};
		opacity: 40%;
	}
	&:disabled {
		background: #fff;
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
			value={props.value}
			defaultValue={props.defaultValue}
			onKeyUp={props.onKeyUp}
			onClick={props.onClick}
			onFocus={props.onFocus}
			style={props.style}
		/>
	);
};

TextField.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string.isRequired,
	placeHolder: PropTypes.string.isRequired,
	value: PropTypes.string,
	onClick: PropTypes.func,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	maxLength: PropTypes.string,
	defaultValue: PropTypes.string,
	onKeyUp: PropTypes.func,
};

export default TextField;
