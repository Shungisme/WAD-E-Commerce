import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
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
	category: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	slug: {
		type: String,
		slug: "title",
		unique: true,
		required: true
	},
	images: {
		type: [String],
		required: true
	},
	relatedProducts: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Product'
	}
},
	{
		timestamps: true
	}
);

export default mongoose.model('Product', productSchema, 'products');