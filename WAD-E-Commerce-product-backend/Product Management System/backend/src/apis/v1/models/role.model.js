import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const roleSchema = new mongoose.Schema({
	title: {
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
	},
	slug: {
		type: String,
		slug: "title",
		unique: true
	},
},
	{
		timestamps: true
	}
);

export default mongoose.model('Role', roleSchema, 'roles');