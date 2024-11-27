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
		role: {
				type: String,
				default: 'user',
				enum: ['user', 'admin']
		},
		status: {
				type: String,
				default: 'active',
				enum: ['active', 'inactive']
		},
		createdAt: {
				type: Date,
				default: Date.now
		},
		updatedAt: {
				type: Date,
				default: Date.now
		}
});


exports.default = mongoose.model('User', userSchema);