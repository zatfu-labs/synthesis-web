const mongoose = require('mongoose');
const {dbURI} = require('../config');

function connectMongoDb() {
	mongoose.connect(process.env.dbURI || dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', () => {
		console.log('[INFO] Connect to DB success!');
	});
}

module.exports.connectMongoDb = connectMongoDb;
