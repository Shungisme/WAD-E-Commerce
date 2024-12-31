import { StatusCodes } from 'http-status-codes';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';

class OrderController {
	static async getAllOrders(req, res) {
		try {
			const orders = await Order.find();

			const updatedOrders = await Promise.all(
				orders.map(async (order) => {
					const updatedProducts = await Promise.all(
						order.products.map(async (item) => {
							const product = await Product.findById(item.productId);
							return {
								...item.toObject(),
								title: product?.title || 'Unknown',
								price: product?.price || 0,
								discount: product?.discount || 0,
								thumbnail: product?.thumbnail || '',
								remainingQuantity: product?.quantity || 0,
							};
						})
					);
					return { ...order.toObject(), products: updatedProducts };
				})
			);

			return res.status(StatusCodes.OK).json({
				orders: updatedOrders
			});
		} catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async getOrderById(req, res) {
		try {
			const { id } = req.params;
			const order = await Order.findById(id).lean();
			if (!order) return res.status(StatusCodes.NOT_FOUND).json({
				error: 'Order not found'
			});

			const updatedProducts = await Promise.all(
				order.products.map(async (item) => {
					const product = await Product.findById(item.productId);
					return {
						...item,
						title: product?.title || 'Unknown',
						price: product?.price || 0,
						discount: product?.discount || 0,
						thumbnail: product?.thumbnail || '',
						remainingQuantity: product?.quantity || 0,
					};
				})
			);
			order.products = updatedProducts;
			return res.status(StatusCodes.OK).json({
				order
			});
		}
		catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async createOrder(req, res) {
		try {
			const orderData = {
				...req.body,
				totalAmount: Number(req.body.totalAmount),
				quantity: Number(req.body.quantity),
			};
			const order = new Order(orderData);
			await order.save();
			return res.status(StatusCodes.CREATED).json({
				order
			});
		} catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async updateOrder(req, res) {
		try {
			const { id } = req.params;
			const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
			if (!order) return res.status(StatusCodes.NOT_FOUND).json({
				error: 'Order not found'
			});
			return res.status(StatusCodes.OK).json({
				order
			});
		}
		catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async deleteOrder(req, res) {
		try {
			const { id } = req.params;
			const order = await Order.findByIdAndUpdate(id, { status: 'deleted' }, { new: true });
			if (!order) return res.status(StatusCodes.NOT_FOUND).json({
				error: 'Order not found'
			});
			return res.status(StatusCodes.OK).json({
				message: 'Order deleted successfully'
			});
		}
		catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}
}

export default OrderController;