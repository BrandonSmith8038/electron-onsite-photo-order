import React from 'react';

import Button from '@material-ui/core/Button';

const ConnectionStatusButton = props => {
	const { setPage, connectionStatus } = props;
	return (
		<div>
			<div style={{ float: 'right' }}>
				{connectionStatus === 'Online' ? (
					<Button
						variant='contained'
						style={{
							backgroundColor: '#4caf50',
							color: 'white',
						}}
						disabled={true}
						onClick={() => setPage('New Order')}
					>
						Online
					</Button>
				) : (
					<Button
						variant='contained'
						style={{
							backgroundColor: '#f44336',
							color: 'white',
						}}
						disabled={true}
					>
						Offline
					</Button>
				)}
			</div>
		</div>
	);
};

export default ConnectionStatusButton;
