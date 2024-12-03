const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	email: {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024
	},
	avatar: {
		type: String,
	},
	role: {
		type: mongoose.Schema.ObjectId,
		ref: 'Role',
		required: true
	},
	status: {
		type: String,
		default: 'active',
		enum: ['active', 'inactive']
	},
},
	{
		timestamps: true
	}
);


exports.default = mongoose.model('User', userSchema, 'users');