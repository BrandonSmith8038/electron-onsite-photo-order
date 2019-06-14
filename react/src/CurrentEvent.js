import React, { useEffect, useState } from 'react';
import { BackButton } from './components/Buttons';
import { MainWrapper, TableWrapper, TableRow } from './Layout';
import { Table } from './components/Table/';
import { Trash, Edit } from './components/Icons';
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

	const orderClick = (type, name) => {
		const event =
			type === 'delete' ? 'delete-current-order' : 'edit-current-order';
		console.log(event, name);
		ipcRenderer.send(event, name);
	};

	return (
		<MainWrapper>
			<BackButton onClick={() => setPage('Home')} />
			{orders.length < 1 ? (
				<h1>There are currently no orders to display</h1>
			) : (
				<TableWrapper width='90%'>
					<Card>
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
														<div onClick={() => orderClick('edit', firstName)}>
															<Edit />
														</div>
														<div
															onClick={() => orderClick('delete', firstName)}
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
