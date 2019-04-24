const homeDir = require('os').homedir();
const fs = require('fs');
const path = require('path');

module.exports = () => {
	const directory = `${homeDir}/Orders`;

	fs.readdir(directory, (err, files) => {
		if (err) throw err;
		for (const file of files) {
			const stats = fs.statSync(path.join(directory, file));
			if (stats.isFile()) {
				fs.unlink(path.join(directory, file), err => {
					if (err) throw err;
				});
			}
		}
	});
};
