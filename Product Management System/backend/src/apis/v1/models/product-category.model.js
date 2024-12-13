import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	parentSlug: {
		type: String,
		default: ""
	},
	description: {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	status: {
		type: String,
		default: 'active',
		enum: ['active', 'inactive']
	},
	slug: {
		type: String,
		unique: true,
		slug: "title",
	}
},
	{
		timestamps: true
	}
);

export default mongoose.model('ProductCategory', productCategorySchema, 'product-categories');