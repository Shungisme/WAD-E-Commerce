import { StatusCodes } from 'http-status-codes';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import ProductCategory from '../models/product-category.model.js';
import Cart from '../models/cart.model.js';
import axios from 'axios';
import JWTHelper from '../../../helpers/jwt.helper.js';

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
			const user = req.userInformation;
			const cart = Cart.findOne({ userId: user._id }).lean();
			const products = cart.products.map(product => {
				const discount = Product.findById(product.productId).lean().discount;
				return {
					productId: product.productId,
					quantity: product.quantity,
					discount: discount
				};
			});

			const totalAmount = products.reduce((total, item) => total + item.price * item.quantity * item.discount / 100, 0);
			const totalQuantity = products.reduce((total, item) => total + item.quantity, 0);

			const orderData = {
				userId: user._id,
				products,
				totalAmount,
				totalQuantity,
			};

			const order = new Order(orderData);
			await order.save();

			await Cart.updateOne({ userId: user._id }, { products: [] });

			const token = await JWTHelper.generateTokenForPaymentSystem({ userId: user._id, email: user.email }, process.env.SYSTEM_SIGNER_KEY);

			const userPaymentInformation = await axios.get(`${PAYMENT_URL}/users`, {
				headers: {
					'payment-system-auth': `${token}`
				}
			});
			return res.status(StatusCodes.CREATED).json({
				order,
				userPaymentInformation
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

	static async getStatistics(req, res) {
		debugger;
		try {
			const { year } = req.query;

			const yearNum = parseInt(year);
			if (!yearNum || isNaN(yearNum)) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					error: 'Valid year is required'
				});
			}

			const orders = await Order.find({
				createdAt: {
					"$gte": new Date(`${year}-01-01T00:00:00.000Z`),
					"$lte": new Date(`${year}-12-31T23:59:59.999Z`)
				},
				status: 'completed'
			}).lean();

			const categories = (await ProductCategory.find({ parentSlug: "" }).select("-_id title").lean()).map(category => category.title);

			const updatedOrders = await Promise.all(
				orders.map(async (order) => {
					const updatedProducts = await Promise.all(
						order.products.map(async (item) => {
							const product = await Product.findOne({ _id: item.productId }).lean();

							let category = await ProductCategory.findOne({ slug: product.categorySlug }).lean();
							if (category.parentSlug) {
								category = await ProductCategory.findOne({ slug: category.parentSlug }).lean();
								category = category.title;
							} else {
								category = category.title;
							}

							return {
								...item,
								title: product?.title || 'Unknown',
								category: category
							};
						}
						)
					);
					return { ...order, products: updatedProducts };
				})
			);

			const monthlyTotalQuantityByCategory = {
				"categories": Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`),
				"series": []
			};
			const yearlyTotalQuantityByCategory = {
				"totalOrders": orders.length,
				"total": 0,
				"categories": categories,
				"series": []
			};

			categories.forEach(category => {
				monthlyTotalQuantityByCategory["series"].push({
					name: category,
					data: []
				});
			});

			for (let i = 1; i <= 12; i++) {
				const monthOrders = updatedOrders.filter(order => new Date(order.createdAt).getMonth() + 1 === i);

				const quantityByCategory = {};
				categories.forEach(category => {
					quantityByCategory[category] = 0;
				});

				monthOrders.map(order => {
					order.products.map(product => {
						quantityByCategory[product.category] += product.quantity;
					});
				});


				monthlyTotalQuantityByCategory["series"].map(category => {
					category.data.push(quantityByCategory[category.name]);
				});
			}

			yearlyTotalQuantityByCategory.categories.forEach(category => {
				const totalQuantity = monthlyTotalQuantityByCategory.series.find(item => item.name === category).data.reduce((a, b) => a + b, 0);
				yearlyTotalQuantityByCategory.total += totalQuantity;
				yearlyTotalQuantityByCategory.series.push(totalQuantity);
			});

			return res.status(StatusCodes.OK).json({
				yearlyTotalQuantityByCategory,
				monthlyTotalQuantityByCategory,
			});
		}
		catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async getOTP(req, res) {
		try {
			const user = req.userInformation;
			const token = await JWTHelper.generateTokenForPaymentSystem({ userId: user._id, email: user.email }, process.env.SYSTEM_SIGNER_KEY);

			await axios.get(`${PAYMENT_URL}/otps`, {
				headers: {
					'payment-system-auth': `${token}`
				}
			});

			return res.status(StatusCodes.OK).json({
				message: 'OTP sent successfully'
			});

		} catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async checkout(req, res) {
		try {
			const orderId = req.body.orderId;
			const order = await Order.findById(orderId);

			const user = req.userInformation;
			const token = await JWTHelper.generateTokenForPaymentSystem({ userId: user._id, email: user.email }, process.env.SYSTEM_SIGNER_KEY);

			await axios.post(`${PAYMENT_URL}/payments`,
				{
					totalAmount: order.totalAmount,
					orderId: req.body.orderId,
					otp: req.body.otp
				},
				{
					headers: {
						'payment-system-auth': `${token}`
					}
				}
			);

			await Order.updateOne({ _id: orderId }, { status: 'completed' });

			return res.status(StatusCodes.OK).json({
				message: 'Payment successful'
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