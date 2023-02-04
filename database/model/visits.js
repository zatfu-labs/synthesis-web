const mongoose = require('mongoose');

const schemaOptions = {
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const visitScema = new mongoose.Schema(
	{
		counter: {
			type: Number,
			required: true,
		},
	},
	schemaOptions
);

const visits = mongoose.model('visits', visitScema, 'visits');

module.exports = visits;
