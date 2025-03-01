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
		default: "https://img.icons8.com/?size=100&id=20563&format=png&color=000000"
	},
	role: {
		type: String,
		default: 'user',
		enum: ['user', 'admin']
	},
	status: {
		type: String,
		default: 'unverified',
		enum: ['unverified', 'active', 'inactive']
	},
},
	{
		timestamps: true
	}
);


export default mongoose.model('User', userSchema, 'users');