const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
	date: String,
	eventName: String,
	venue: String,
	lastName: String,
	firstName: String,
	email: String,
	phone: String,
	street: String,
	city: String,
	state: String,
	photos: String,
	notes: String,
	payment: String,
	total: String,
});

module.exports = mongoose.model('Order', OrderSchema);
