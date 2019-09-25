const homeDir = require('os').homedir();
const fs = require('fs');
const path = require('path');
const log = require('electron-log');

module.exports = () => {
	const directory = `${homeDir}/Orders`;

	if (fs.existsSync(directory)) {
		fs.readdir(directory, (err, files) => {
			if (err) {
				log.error(
					`*clearOrders.js* - Problem Reading Files From Orders Directory `,
				);

				throw err;
			}
			for (const file of files) {
				const stats = fs.statSync(path.join(directory, file));
				if (stats.isFile()) {
					fs.unlink(path.join(directory, file), err => {
						if (err) {
							log.error(`*clearOrders.js* - Problem Deleting Order - ${file}`);
							throw err;
						}
						log.info(`*clearOrders.js* - Order Deleted - ${file}`);
					});
				}
			}
		});
	} else {
		log.error(`*clearOrders.js* - Orders Directory Does Not Exist `);
	}
};
