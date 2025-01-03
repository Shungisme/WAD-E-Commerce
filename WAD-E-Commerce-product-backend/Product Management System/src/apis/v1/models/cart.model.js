import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	products: {
		type: [{
			_id: false,
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
				required: true
			},
			quantity: {
				type: Number,
				required: true
			}
		}],
		required: true
	},
},
	{
		timestamps: true,
	}
);

export default mongoose.model('Cart', cartSchema, 'carts');