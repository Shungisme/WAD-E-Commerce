const mongoose = require('mongoose');
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	parent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ProductCategory',
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
		required: true
	}
},
	{
		timestamps: true
	}
);

exports.default = mongoose.model('ProductCategory', productCategorySchema, 'product-categories');