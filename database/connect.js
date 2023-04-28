const mongoose = require('mongoose');
const { dbURI } = require('../config');
const debug = require("debug")("synthesis-web:MongoDB")

function connectMongoDb() {
	mongoose.connect(process.env.dbURI || dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	if (process.env.NODE_ENV === 'development') {
		db.on('reconnect', () => {
		debug('Reconnecting To MongoDB <🔄>')
		});
	} 
	db.once('open', () => {
		console.log('[🚀] Database MongoDB Ready!');
	});
}

module.exports.connectMongoDb = connectMongoDb;
