import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { whiteText } from '../Colors.js';

const SideBarItemWrapper = styled.div`
	color: ${whiteText};
	cursor: pointer;
	font-family: 'Roboto';
	font-size: 20px;
	padding: 30px;
	text-align: center;
	text-transform: uppercase;
	transition: 0.6s;
	width: 100%;

	&:hover {
		background: #444;
	}
`;

const SideBarItem = props => {
	const { onClick, title } = props;
	return <SideBarItemWrapper onClick={onClick}>{title}</SideBarItemWrapper>;
};

SideBarItem.propTypes = {
	onClick: PropTypes.func,
	title: PropTypes.string,
};

export default SideBarItem;
