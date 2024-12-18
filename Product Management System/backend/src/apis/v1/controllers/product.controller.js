import { StatusCodes } from 'http-status-codes';
import Product from '../models/product.model.js';
import ProductCategory from '../models/product-category.model.js';

class ProductController {
	static async getAllProducts(req, res) {
		const { categorySlug = "", page = 1, limit = 100, search = "", sort = "" } = req.query;
		const startIndex = (page - 1) * limit;

		try {
			const options = {
				status: 'active',
			};

			const allCategorySlugs = ProductCategory.find({ parentSlug: categorySlug }).lean().select('slug');
			const categorySlugs = [categorySlug, ...(await allCategorySlugs).map((category) => category.slug)];

			if (categorySlug)
				options.categorySlug = { $in: categorySlugs };

			if (search)
				options.title = { $regex: search, $options: 'i' };

			const totalProducts = await Product.countDocuments(options);
			const products = await Product.find(options)
				.skip(startIndex)
				.limit(parseInt(limit))
				.lean();

			if (sort) {
				products.sort((a, b) => {
					if (sort === 'newest') {
						return new Date(b.createdAt) - new Date(a.createdAt);
					}
					else if (sort === 'oldest') {
						return new Date(a.createdAt) - new Date(b.createdAt);
					}
					else if (sort === 'asc') {
						return a.price - b.price;
					}
					else if (sort === 'desc') {
						return b.price - a.price;
					}
				});
			}

			const productsWithCategoryTitle = await Promise.all(
				products.map(async (product) => {
					const category = await ProductCategory.findOne({ slug: product.categorySlug })
						.lean()
						.select('title');
					return {
						...product,
						categoryTitle: category ? category.title : null,
					};
				})
			);

			return res.status(StatusCodes.OK).json({
				totalProducts,
				totalPages: Math.ceil(totalProducts / limit),
				currentPage: parseInt(page),
				products: productsWithCategoryTitle
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

	static async getProductBySlug(req, res) {
		const { slug } = req.params;
		try {
			const product = await Product.findOne({ slug, status: 'active' }).lean();
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
