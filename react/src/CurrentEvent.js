import React, { useEffect, useState } from 'react';
import { BackButton } from './components/Buttons';
import { MainWrapper, TableWrapper } from './Layout';
import { Card } from './components/Card';

const { ipcRenderer } = window.require('electron');

const CurrentEvent = props => {
	const { setPage } = props;
	const [orders, setOrders] = useState([]);
	let output;

	useEffect(() => {
		ipcRenderer.send('get-current-orders');
	}, []);

	ipcRenderer.on('send-current-orders', (event, orderData) => {
		setOrders(orderData);
	});

	return (
		<MainWrapper>
			<BackButton onClick={() => setPage('Home')} />
			<TableWrapper width='80%'>
				<Card>
					<div className='table'>
						{orders.map(order => {
							const { firstName, lastName } = order;
							return (
								<>
									<p>
										First Name: {firstName} Last Name: {lastName}
									</p>
								</>
							);
						})}
					</div>
				</Card>
			</TableWrapper>
		</MainWrapper>
	);
};

export default CurrentEvent;
