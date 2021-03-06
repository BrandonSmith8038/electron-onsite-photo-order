const electron = require('electron');
const { dialog, BrowserWindow } = require('electron');
const fsPromises = require('fs').promises;
const Order = require('./schemas/OrdersSchema');
const homeDir = require('os').homedir();
const path = require('path');
const remote = electron.remote;
const fs = require('fs');
const keys = require('./config');
const customerJSON = keys.CUSTOMERSFILE;
const getData = require('./utils/nightlyOrderTotals');
const log = require('electron-log');

const ipcMain = require('electron').ipcMain;

const getCustomers = () =>
	ipcMain.on('getCustomers', async (event, arg) => {
		let customers;
		fs.readFile(customerJSON, (err, data) => {
			if (err) {
				log.error(`Problem Reading The Customers File, ${err}`);
			}
			customers = data.toString('utf8');
			event.reply('sendCustomers', customers);
			log.info(`Customers File Retrivied`);
		});
	});

const createOrder = () => {
	ipcMain.on('create-order', (event, order, edit) => {
		const newOrderJSON = JSON.stringify(order);
		const { firstName, lastName, date, total } = order;

		// const { date, firstName, lastName, total } = arg;

		const filePath = `${homeDir}/Orders/${date}-${firstName} ${lastName}.json`;

		fs.writeFile(filePath, newOrderJSON, 'utf8', err => {
			if (err) {
				log.error(`Problem Saving The Order: ${err}`);
				return;
			}
			if (edit) {
				event.sender.send('order-edited', { firstName, lastName, date, total });
				log.info(`Order Saved: ${order}`);
			} else {
				event.sender.send('order-saved', { firstName, lastName, date, total });
				log.info(`Order Saved: ${order}`);
			}
		});
	});
};

const writeOrderDB = () =>
	ipcMain.on('write-order-db', (event, arg) => {
		const newOrder = new Order(arg);
		newOrder.save(err => {
			if (err) {
				log.error(
					`Problem Saving Order To Database: ${err} - Order: ${newOrder}`,
				);
			}
			log.info(`Order Saved To Database: ${newOrder}`);
		});
	});

const notifyOrderTotals = () =>
	ipcMain.on('notify-order-totals', (event, arg) => {
		const { nightlyTotal, numberOfOrders } = getData;
		const options = {
			type: 'info',
			buttons: ['Ok'],
			title: 'Nightly Order Info',
		};

		numberOfOrders === 0
			? (options.message = "You haven't sold anything yet, get busy!")
			: (options.message = `So far you have made ${numberOfOrders} sales totaling ${nightlyTotal}!`);

		dialog.showMessageBox(null, options);
	});

const eventEndNoConnection = () =>
	ipcMain.on('event-end-no-connection', () => {
		const options = {
			type: 'error',
			buttons: ['Ok'],
			title: 'Error',
			message: 'You Must Be Connected To The Internet First',
		};
		dialog.showMessageBox(null, options);
	});

const eventEndWithConnection = () =>
	ipcMain.on('event-end-with-connection', (event, currentEvent) => {
		const options = {
			type: 'question',
			buttons: ['No', 'Yes'],
			message: 'Are You Sure You Want To End This Event?',
			title: 'Confirm event end',
		};
		dialog.showMessageBox(null, options, response => {
			//TODO Need To Add Confirmation Dialogs
			if (response === 0) return;
			const { eventName, venue } = currentEvent;
			const ordersDirectory = `${homeDir}/Orders`;
			const pdfDirectory = `${homeDir}/Orders/PDFs`;
			// Look in The Orders Directory and see if there are files
			const files = fs.readdirSync(ordersDirectory);
			// Check if the event folder already exists
			if (fs.existsSync(`${pdfDirectory}/${venue}-${eventName}`)) {
				log.error('Event Folder Already Exists');
			}
			const eventFolder = `${pdfDirectory}/${venue}-${eventName}`;
			// Show Error If There Are No Files
			if (files.length <= 1) {
				dialog.showErrorBox(
					`Error Saving Files `,
					'There Are No Orders To Use',
				);
			}
			fsPromises
				.mkdir(eventFolder)
				.catch(e => {
					throw e;
				})
				.then(() => {
					for (const file of files) {
						const stats = fs.statSync(path.join(ordersDirectory, file));
						if (stats.isFile()) {
							const data = fs.readFileSync(path.join(ordersDirectory, file));
							const orderData = JSON.parse(data);
							//TODO: Check If Folders Already Exist
							fsPromises
								.mkdir(
									`${eventFolder}/${orderData.firstName} ${orderData.lastName}`,
									{ recursive: true },
								)
								.catch(e => {
									throw e;
								})
								.then(() => {
									const createPDF = require('./utils/createPDF');
									//TODO Need TO Change This To A Promise
									createPDF(orderData, eventFolder);
								})
								.then(() => {
									const newOrder = new Order(orderData);
									newOrder
										.save()
										.catch(e => {
											throw e;
										})

										.then(() => {
											fs.copyFile(
												path.join(pdfDirectory, file),
												path.join(eventFolder, file),
												err => {
													if (
														err => {
															console.log(err);
														}
													)
														fs.unlink(path.join(ordersDirectory, file), err => {
															if (err) {
																log.error(`Could Not Delete File: ${file}`);
															}
															log.info(`File Deleted: ${file}`);
														});
												},
											);
										});
								});
						}
					}
				});
			event.sender.send('clear-event');
		});
	});
const getCurrentOrders = () => {
	ipcMain.on('get-current-orders', (event, arg) => {
		const ordersDirectory = `${homeDir}/Orders`;
		// Get All The Files In Orders Directory
		const files = fs.readdirSync(ordersDirectory);
		let orderArray = [];
		for (const file of files) {
			// Read Each File Stats
			const stats = fs.statSync(path.join(ordersDirectory, file));
			// If The file is an actual file and not a directory
			if (stats.isFile()) {
				// Read The Data Of Each File
				const data = fs.readFileSync(path.join(ordersDirectory, file));
				// Push The Data To The Orders Array
				orderArray.push(JSON.parse(data));
			}
			// Send The Orders Back To The IPCRenderer That Asked For It
			event.reply('send-current-orders', orderArray);
		}
	});
};

const deleteCurrentOrder = () => {
	ipcMain.on('delete-current-order', (event, firstName, lastName) => {
		const options = {
			type: 'question',
			buttons: ['No', 'Yes'],
			message: 'Are You Sure You Want To Delete This Order?',
			title: 'Confirm Order Delete',
		};
		dialog.showMessageBox(null, options, response => {
			if (response === 0) return;
			//TODO Need To Add Confirmation Dialogs
			const ordersDirectory = `${homeDir}/Orders`;
			// Get All The Files In Orders Directory
			let files = fs.readdirSync(ordersDirectory);
			let filepath;
			for (const file of files) {
				// Read Each File Stats
				const stats = fs.statSync(path.join(ordersDirectory, file));
				// If The file is an actual file and not a directory

				if (stats.isFile()) {
					// Read The Data Of Each File
					const data = fs.readFileSync(path.join(ordersDirectory, file));
					// Save The Order To JSON
					const order = JSON.parse(data);
					// If the firsName and lastName that were sent match the firstName and lastName of the order read
					if (firstName === order.firstName && lastName === order.lastName) {
						// Grab the filepath of that current Order
						filepath = path.join(ordersDirectory, file);
					}
				}
			}
			// Delete The File with the filepath that was found
			fs.unlink(filepath, err => {
				// If There Was An Error Deleting
				if (err) {
					console.log('There Was An Error');
				}
				// Create an arrays of orders
				let orderArray = [];
				// Reread all the files and directories in the orders directory.
				let files = fs.readdirSync(ordersDirectory);
				// Loop through each file or directory
				for (const file of files) {
					// If its an actual file and not a directory add it to the new orders array
					const stats = fs.statSync(path.join(ordersDirectory, file));
					if (stats.isFile()) {
						const data = fs.readFileSync(path.join(ordersDirectory, file));
						orderArray.push(JSON.parse(data));
					}
					// Send the array of orders back to who asked for it.
					event.reply('send-current-orders', orderArray);
				}
				console.log('Deleted');
				event.reply('order-deleted', firstName);
			});
		});
	});
};

const editCurrentOrder = () => {
	ipcMain.on('edit-current-order', (event, firstName, lastName) => {
		console.log('Edit', firstName);
	});
};

const logLocalStorageCurrentEvent = () => {
	ipcMain.on(
		'local-storage-current-event-change',
		(event, currentEvent, action, file) => {
			if (action === 'removed') {
				log.info(`The current Event was ${action} from ${file}`);
			} else {
				log.info(
					`The Current Event Was ${action} To ${currentEvent.venue}-${currentEvent.eventName} from ${file}`,
				);
			}
		},
	);
};

module.exports = {
	getCustomers,
	deleteCurrentOrder,
	editCurrentOrder,
	writeOrderDB,
	notifyOrderTotals,
	eventEndNoConnection,
	eventEndWithConnection,
	createOrder,
	getCurrentOrders,
	logLocalStorageCurrentEvent,
};
