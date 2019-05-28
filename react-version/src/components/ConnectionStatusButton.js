import React from 'react';
import PropTypes from 'prop-types';

const ConnectionStatusButton = props => {
	const { setPage, connectionStatus } = props;
	return (
		<div>
			<div style={{ float: 'right' }}>
				{connectionStatus === 'Online' ? (
					<button
						style={{
							backgroundColor: '#4caf50',
							color: 'white',
						}}
						disabled={true}
						onClick={() => setPage('New Order')}
					>
						Online
					</button>
				) : (
					<button
						style={{
							backgroundColor: '#f44336',
							color: 'white',
						}}
						disabled={true}
					>
						Offline
					</button>
				)}
			</div>
		</div>
	);
};

ConnectionStatusButton.propTypes = {
	connectionStatus: PropTypes.string.isRequired,
	setPage: PropTypes.func.isRequired,
};

export default ConnectionStatusButton;
