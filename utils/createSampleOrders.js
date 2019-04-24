const fs = require('fs');
const homeDir = require('os').homedir();
const sampleData = require('../sampleData');

module.exports = () => {
	console.log('Order1: ', sampleData[0]);
	console.log('Order2: ', sampleData[1]);
	console.log('Order3: ', sampleData[2]);

	const filePath1 = `${homeDir}/Orders/${sampleData[0].date}-${
		sampleData[0].firstName
	} ${sampleData[0].lastName}.json`;

	const filePath2 = `${homeDir}/Orders/${sampleData[1].date}-${
		sampleData[1].firstName
	} ${sampleData[1].lastName}.json`;

	const filePath3 = `${homeDir}/Orders/${sampleData[2].date}-${
		sampleData[2].firstName
	} ${sampleData[2].lastName}.json`;

	fs.writeFile(filePath1, JSON.stringify(sampleData[0]), 'utf8', err => {
		if (err) {
			console.log(err);
			return;
		}
	});
	fs.writeFile(filePath2, JSON.stringify(sampleData[1]), 'utf8', err => {
		if (err) {
			console.log(err);
			return;
		}
	});
	fs.writeFile(filePath3, JSON.stringify(sampleData[2]), 'utf8', err => {
		if (err) {
			console.log(err);
			return;
		}
	});
};
