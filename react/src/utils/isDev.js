export default () => {
	// Create Function to check if running in production or dev
	return process.env.NODE_ENV === 'development' ? true : false;
};
