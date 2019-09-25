const homeDir = require('os').homedir();
const fs = require('fs');
const path = require('path');
const log = require('electron-log');

const getData = () => {
	const directory = `${homeDir}/Orders`;
	const totals = [];
	let numberOfOrders = 0;

	if (fs.existsSync(directory)) {
		const files = fs.readdirSync(directory);
		for (const file of files) {
			const stats = fs.statSync(path.join(directory, file));
			if (stats.isFile()) {
				try {
					const data = fs.readFileSync(`${directory}/${file}`);
					const order = JSON.parse(data);
					const total = parseInt(order.total);
					totals.push(total);
					numberOfOrders++;
				} catch (error) {
					log.error(
						`${error}, There is an non .JSON file type in the orders folder`,
					);
				}
			}
		}
	} else {
		log.error('Orders Directory Does Not Exist');
	}

	let nightlyTotal = totals.reduce((x, y) => x + y, 0);

	return {
		nightlyTotal,
		numberOfOrders,
	};
};

module.exports = getData();
