import React from 'react';
import styled from 'styled-components/macro';
import { primary, primaryAccent } from '../Colors.js';
import PropTypes from 'prop-types';

const transition = '.5s';
const width = '2rem';
const radius = '50%';
const bHeight = '5px';
const bWidth = '5px';
const angle = '35deg';
const bg = 'whitesmoke';
const buttonbg = 'dodgerblue';

const Button = styled.button`
	padding: 14px;
	border-radius: 6px;
	background: ${primary};
	cursor: pointer;
	-webkit-transition: calc(0.5s / 2);
	transition: calc(0.5s / 2);
	position: absolute;
	left: 10px;
	top: 10px;
	outline: none;
	border: none;
	&:hover {
		background: ${primaryAccent};
	}
`;

const Arrow = styled.div`
	position: relative;
	background: ${bg};
	width: ${width};
	height: calc(${width} / 10);
	transition: ${transition};
	border-radius: ${radius};
	transform-origin: right center;

	&:before {
		transform: rotate(-${angle});
	}
	&:after {
		transform: rotate(${angle});
	}

	&:before,
	&:after {
		display: block;
		content: '';
		position: absolute;
		left: 0;
		background: ${bg};
		width: calc(${width} / 2);
		height: calc(${width} / 10);
		transform-origin: calc(${width} / 20) center;
		transition: ${transition};
		border-radius: ${radius};
	}
`;

const BackButton = props => {
	return (
		<Button onClick={props.onClick}>
			<Arrow />
		</Button>
	);
};

BackButton.propTypes = {
	onClick: PropTypes.func,
};

export default BackButton;
