import React from 'react';
import styled from 'styled-components/macro';
import BackArrow from '../Icons/BackArrow';
import PropTypes from 'prop-types';

const Button = styled.button`
	background: none;
	border-radius: 6px;
	border: none;
	cursor: pointer;
	left: 10px;
	outline: none;
	padding: 2px 20px;
	position: absolute;
	top: 10px;
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
