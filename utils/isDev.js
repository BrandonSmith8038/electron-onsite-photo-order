module.exports = () => {
	// Create Function to check if running in production or dev
	return process.mainModule.filename.indexOf('app.asar') === -1;
};
