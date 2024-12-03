import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	description: {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	permissions: {
		type: [String],
		required: true
	},
	status: {
		type: String,
		default: 'active',
		enum: ['active', 'inactive']
	}
},
	{
		timestamps: true
	}
);

export default mongoose.model('Role', roleSchema, 'roles');