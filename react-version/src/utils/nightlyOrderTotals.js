const homeDir = require('os').homedir();
const fs = require('fs');
const path = require('path');

const getData = () => {
	const directory = `${homeDir}/Orders`;
	const totals = [];
	let numberOfOrders = 0;

	const files = fs.readdirSync(directory);

	for (const file of files) {
		const stats = fs.statSync(path.join(directory, file));
		if (stats.isFile()) {
			const data = fs.readFileSync(`${directory}/${file}`);
			const order = JSON.parse(data);
			const total = parseInt(order.total);
			totals.push(total);
			numberOfOrders++;
		}
	}
	let nightlyTotal = totals.reduce((x, y) => x + y, 0);

	return {
		nightlyTotal,
		numberOfOrders,
	};
};

module.exports = getData();
