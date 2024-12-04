import mongoose from "mongoose";

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
		type: String,
		default: 'user',
		enum: ['user', 'admin']
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


export default mongoose.model('User', userSchema, 'users');