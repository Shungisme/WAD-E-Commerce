import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
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
			},
			discount: {
				type: Number,
				required: true
			},
		}],
		required: true
	},
	totalAmount: {
		type: Number,
		required: true
	},
	totalQuantity: {
		type: Number,
		required: true
	},
	address: {
		type: String,
	},
	phoneNumber: {
		type: String,
	},
	status: {
		type: String,
		default: 'pending',
		enum: ['pending', 'processing', 'completed', 'cancelled', 'deleted']
	},
},
	{
		timestamps: true,
	}
);

export default mongoose.model('Order', orderSchema, 'orders');