import React from 'react';
import styled from 'styled-components/macro';
import { primary, hint } from '../Colors.js';
import PropTypes from 'prop-types';

const TextAreaField = styled.textarea`
	padding: 15px 10px;
	font-family: 'Roboto', Fallback, sans-serif;
	border-radius: 5px;
	font-size: 18px;
	border: 1px solid ${primary};
	transition: 0.5s;
	outline: none;
	resize: none;

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

const TextArea = props => {
	return (
		<TextAreaField
			name={props.name}
			id={props.name}
			placeholder={props.placeHolder}
			rows='4'
			onChange={props.onChange}
			required={props.required ? true : false}
			disabled={props.disabled ? true : false}
			maxLength={props.maxLength ? props.maxLength : null}
			value={props.value}
			width='100%'
			style={props.style}
		/>
	);
};

TextArea.propTypes = {
	disabled: PropTypes.bool,
	maxLength: PropTypes.string,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeHolder: PropTypes.string.isRequired,
	required: PropTypes.bool,
	value: PropTypes.string,
};

export default TextArea;
