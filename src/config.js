const isDev = require('../utils/isDev');
const dev = require('./keys.dev');
const prod = require('./keys.prod');

if (isDev()) {
	module.exports = dev;
} else {
	module.exports = prod;
}
