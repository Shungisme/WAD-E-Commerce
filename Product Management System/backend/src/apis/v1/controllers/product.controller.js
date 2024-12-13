import { StatusCodes } from 'http-status-codes';
import Product from '../models/product.model.js';
import mongoose from 'mongoose';

class ProductController {
	static async getAllProducts(req, res) {
		const { categorySlug, page = 1, limit = 100 } = req.query;
		const startIndex = (page - 1) * limit;

		try {
			const options = {
				status: 'active',
			};

			if (categorySlug)
				options.categorySlug = categorySlug;

			const totalProducts = await Product.countDocuments(options);
			const products = await Product.find(options)
				.skip(startIndex)
				.limit(parseInt(limit));

			return res.status(StatusCodes.OK).json({
				totalProducts,
				totalPages: Math.ceil(totalProducts / limit),
				currentPage: parseInt(page),
				products
			});

		} catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async getProductById(req, res) {
		try {
			const { id } = req.params;
			const product = await Product.findOne({ _id: id, status: 'active' }).lean();
			if (!product) return res.status(StatusCodes.NOT_FOUND).json({
				error: 'Product not found'
			});

			const relatedProducts = await Product.find({
				status: 'active',
				categorySlug: product.categorySlug,
				_id: { $ne: product._id }
			}).limit(5).lean();

			return res.status(StatusCodes.OK).json({
				...product,
				relatedProducts
			});
		} catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async createProduct(req, res) {
		try {
			const productData = {
				...req.body,
				price: Number(req.body.price),
				quantity: Number(req.body.quantity),
				discount: Number(req.body.discount),
			};
			const product = new Product(productData);
			await product.save();
			return res.status(StatusCodes.CREATED).json({
				product
			});
		} catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async updateProduct(req, res) {
		try {
			const { id } = req.params;
			const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
			if (!product) return res.status(StatusCodes.NOT_FOUND).json({
				error: 'Product not found'
			});

			return res.status(StatusCodes.OK).json({
				product
			});
		}
		catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async deleteProduct(req, res) {
		try {
			const { id } = req.params;
			const product = await Product.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
			if (!product) return res.status(StatusCodes.NOT_FOUND).json({
				error: 'Product not found'
			});
			return res.status(StatusCodes.OK).json({
				message: 'Product deleted successfully'
			});
		}
		catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}
}

export default ProductController;
