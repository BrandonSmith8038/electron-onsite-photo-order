const dns = require('dns');

status = 'Not Connected';
module.exports = () => {
	dns.lookup('google.com', (err, addresses) => {
		if (err) {
			status = 'Not Connected';
		} else {
			status = 'Connected';
		}
	});
	return status;
};
