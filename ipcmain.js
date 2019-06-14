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

const ipcMain = require('electron').ipcMain;

const getCustomers = () =>
	ipcMain.on('getCustomers', async (event, arg) => {
		let customers;
		fs.readFile(customerJSON, (err, data) => {
			if (err) {
				throw err;
			}
			customers = data.toString('utf8');
			event.reply('sendCustomers', customers);
		});
	});

const createOrder = () => {
	ipcMain.on('create-order', (event, arg) => {
		const newOrderJSON = JSON.stringify(arg);
		const { firstName, lastName, date, total } = arg;

		// const { date, firstName, lastName, total } = arg;

		const filePath = `${homeDir}/Orders/${date}-${firstName} ${lastName}.json`;

		fs.writeFile(filePath, newOrderJSON, 'utf8', err => {
			if (err) {
				return;
			}
			event.sender.send('order-saved', { firstName, lastName, date, total });
		});
	});
};

const writeOrderDB = () =>
	ipcMain.on('write-order-db', (event, arg) => {
		const newOrder = new Order(arg);
		newOrder.save(err => {
			if (err) {
			}
		});
	});

const notifyOrderTotals = () =>
	ipcMain.on('notify-order-totals', (event, arg) => {
		const { nightlyTotal, numberOfOrders } = arg;
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
	ipcMain.on('event-end-with-connection', (event, arg) => {
		const options = {
			type: 'question',
			buttons: ['No', 'Yes'],
			message: 'Are You Sure You Want To End This Event?',
			title: 'Confirm event end',
		};
		dialog.showMessageBox(null, options, response => {
			//TODO Need To Add Confirmation Dialogs
			if (response === 0) return;
			const ordersDirectory = `${homeDir}/Orders`;
			const pdfDirectory = `${homeDir}/Orders/PDFs`;
			// Look in The Orders Directory and see if there are files
			const files = fs.readdirSync(ordersDirectory);
			// Show Error If There Are No Files
			if (files.length <= 1) {
				dialog.showErrorBox(
					`Error Saving Files `,
					'There Are No Orders To Use',
				);
			}
			for (const file of files) {
				const stats = fs.statSync(path.join(ordersDirectory, file));
				if (stats.isFile()) {
					const data = fs.readFileSync(path.join(ordersDirectory, file));
					const orderData = JSON.parse(data);
					//TODO: Check If Folders Already Exist
					fsPromises
						.mkdir(
							`${pdfDirectory}/${orderData.firstName} ${orderData.lastName}`,
						)
						.catch(e => {
							throw e;
						})
						.then(() => {
							const createPDF = require('./utils/createPDF');
							//TODO Need TO Change This To A Promise
							createPDF(orderData);
						})
						.then(() => {
							const newOrder = new Order(orderData);
							newOrder
								.save()
								.catch(e => {
									throw e;
								})
								.then(() => {
									fs.unlink(path.join(ordersDirectory, file), err => {
										if (err) throw err;
									});
								});
						});
				}
			}
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
};
