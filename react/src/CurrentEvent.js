import React, { useEffect, useState } from 'react';
import { BackButton } from './components/Buttons';
import { MainWrapper, TableWrapper, TableRow } from './Layout';
import { Table } from './components/Table/';
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
			{orders.length < 1 ? (
				<h1>There are currently no orders to display</h1>
			) : (
				<TableWrapper width='90%'>
					<Card>
						<Table>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Photos</th>
							{orders.map(order => {
								const { firstName, lastName, email, phone, photos } = order;
								return (
									<>
										<tr>
											<td>
												{firstName} {lastName}
											</td>
											<td>{email}</td>
											<td>{phone}</td>
											<td>{photos}</td>
										</tr>
									</>
								);
							})}
						</Table>
					</Card>
				</TableWrapper>
			)}
		</MainWrapper>
	);
};

export default CurrentEvent;
