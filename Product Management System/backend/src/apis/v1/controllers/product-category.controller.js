import productCategoryModel from "../models/product-category.model.js";
import { StatusCodes } from 'http-status-codes';

class ProductCategoryController {
	static async getAllProductCategories(req, res) {
		try {
			const productCategories = await productCategoryModel.find().lean();
			const categoriesWithChildren = await Promise.all(
				productCategories.map(async (category) => {
					category.childSlugs = productCategories
						.filter((child) => child.parentSlug === category.slug)
						.map((child) => child.slug);

					return category;
				})
			);

			res.status(StatusCodes.OK).json({
				productCategories: categoriesWithChildren
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async megaMenuTitle(req, res) {
		productCategoryModel.find().lean()
			.then((productCategories) => {
				const megaMenuTitle = productCategories
					.filter((category) => !category.parentSlug)
					.map((category) => {
						category.children = productCategories
							.filter((child) => child.parentSlug === category.slug)
							.map((child) => child.title);
						return [category.title, category.children];
					});
				res.status(StatusCodes.OK).json({ megaMenuTitle });
			})
			.catch((error) => {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
					error: error.message
				});
			});
	}

	static async getProductCategoryById(req, res) {
		try {
			const { id } = req.params;
			const productCategory = await productCategoryModel.findById(id);
			if (!productCategory) return res.status(StatusCodes.NOT_FOUND).json({
				error: 'Product category not found'
			});
			res.status(StatusCodes.OK).json({
				productCategory
			});
		}
		catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async createProductCategory(req, res) {
		try {
			const productCategory = new productCategoryModel(req.body);
			await productCategory.save();
			res.status(StatusCodes.CREATED).json({
				productCategory
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async updateProductCategory(req, res) {
		try {
			const { id } = req.params;
			const productCategory = await productCategoryModel.findByIdAndUpdate(id, req.body, { new: true });
			if (!productCategory) return res.status(StatusCodes.NOT_FOUND).json({
				error: 'Product category not found'
			});
			res.status(StatusCodes.OK).json({
				productCategory
			});
		}
		catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async deleteProductCategory(req, res) {
		try {
			const { id } = req.params;
			const productCategory = await productCategoryModel.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
			if (!productCategory) return res.status(StatusCodes.NOT_FOUND).json({
				error: 'Product category not found'
			});
			res.status(StatusCodes.OK).json({
				message: 'Product category deleted successfully'
			});

		}
		catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async getProductCategoryBySlug(req, res) {
		try {
			const { slug } = req.params;
			const productCategory = await productCategoryModel.findOne({ slug });
			if (!productCategory) return res.status(StatusCodes.NOT_FOUND).json({
				error: 'Product category not found'
			});
			res.status(StatusCodes.OK).json({
				productCategory
			});
		}
		catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

}

export default ProductCategoryController;
