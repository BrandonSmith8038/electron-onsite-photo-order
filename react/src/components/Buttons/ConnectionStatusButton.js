import React from 'react';
import PropTypes from 'prop-types';
import { whiteText, success, error } from '../Colors.js/index.js';

const ConnectionStatusButton = props => {
	const { connectionStatus } = props;
	const ButtonStyle = {
		color: whiteText,
		background: connectionStatus === 'Online' ? success : error,
		border: 'none',
		borderRadius: '3px',
		fontFamily: 'Roboto',
		opacity: 0.8,
		outline: 'none',
		padding: '8px 12px',
		textTransform: 'uppercase',
		position: 'absolute',
		top: 5,
		right: 5,
	};
	return (
		<div style={{ float: 'right' }}>
			<button style={ButtonStyle} disabled={true}>
				{connectionStatus === 'Online' ? 'Online' : 'Offline'}
			</button>
		</div>
	);
};

ConnectionStatusButton.propTypes = {
	connectionStatus: PropTypes.string.isRequired,
	setPage: PropTypes.func.isRequired,
};

export default ConnectionStatusButton;
