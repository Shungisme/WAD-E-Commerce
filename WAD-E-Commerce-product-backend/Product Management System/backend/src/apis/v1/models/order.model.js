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
			}
		}],
		required: true
	},
	total: {
		type: Number,
		required: true
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