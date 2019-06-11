import React from 'react';
import styled from 'styled-components/macro';
import { primary, hint } from '../Colors.js';
import BackArrow from '../Icons/BackArrow';
import PropTypes from 'prop-types';

const Button = styled.button`
	padding: 2px 20px;
	border-radius: 6px;
	background: none;
	cursor: pointer;
	position: absolute;
	left: 10px;
	top: 10px;
	outline: none;
	border: none;
`;

const BackButton = props => {
	return (
		<Button onClick={props.onClick}>
			<BackArrow />
		</Button>
	);
};

BackButton.propTypes = {
	onClick: PropTypes.func,
};

export default BackButton;
