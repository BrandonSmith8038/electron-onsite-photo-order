import React, { useEffect, useState } from 'react';
import { BackButton, PrimaryButton } from './components/Buttons';
import { MainWrapper, TableWrapper, TableRow } from './Layout';
import { Table } from './components/Table/';
import { Trash, Edit } from './components/Icons';
import { Card } from './components/Card';

const { ipcRenderer } = window.require('electron');

const CurrentEvent = props => {
	const { setPage, setCurrentOrder } = props;
	const [orders, setOrders] = useState([]);
	let output;

	useEffect(() => {
		ipcRenderer.send('get-current-orders');
	}, []);

	ipcRenderer.on('send-current-orders', (event, orderData) => {
		setOrders(orderData);
	});

	const getNightlyTotal = () => {
		ipcRenderer.send('notify-order-totals');
	};

	// ipcRenderer.on('order-deleted', (event, name) => {
	// 	const notification = {
	// 		title: 'Order Deleted',
	// 		// icon: '../../../assets/icons/png/24x24.png',
	// 		body: `${name}'s Order Deleted`,
	// 	};
	// 	new Notification(notification.title, notification);
	// });

	return (
		<MainWrapper>
			<BackButton onClick={() => setPage('Home')} />
			{orders.length < 1 ? (
				<h1>There are currently no orders to display</h1>
			) : (
				<TableWrapper width='90%'>
					<Card>
						<PrimaryButton width='25%' onClick={() => getNightlyTotal()}>
							Nightly Total
						</PrimaryButton>
						<Table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Photos</th>
								</tr>
							</thead>
							<tbody>
								{orders.map(order => {
									const { firstName, lastName, email, phone, photos } = order;
									return (
										<tr key={firstName}>
											<td>
												{firstName} {lastName}
											</td>
											<td>{email}</td>
											<td>{phone}</td>
											<td>{photos}</td>
											<td>
												{
													<div
														style={{
															display: 'flex',
															width: '100%',
															height: '100%',
														}}
													>
														<div
															onClick={() => {
																setPage('Edit Order');
																setCurrentOrder(order);
															}}
														>
															<Edit />
														</div>
														<div
															onClick={() =>
																ipcRenderer.send(
																	'delete-current-order',
																	firstName,
																	lastName,
																)
															}
														>
															<Trash />
														</div>
													</div>
												}
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</Card>
				</TableWrapper>
			)}
		</MainWrapper>
	);
};

export default CurrentEvent;
