import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
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
		max: 1000000
	},
	thumbnail: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	status: {
		type: String,
		default: 'active',
		enum: ['active', 'inactive']
	},
	discount: {
		type: Number,
		default: 0
	},
	categorySlug: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		slug: "title",
		unique: true
	},
	images: {
		type: [String],
		required: true
	},
},
	{
		timestamps: true
	}
);

export default mongoose.model('Product', productSchema, 'products');