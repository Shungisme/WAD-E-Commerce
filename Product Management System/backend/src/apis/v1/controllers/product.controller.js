class ProductController {
	static async getAllProducts(req, res) {
		try {
			// const products = await _product.default.find();
			return res.status(200).json({
				products
			});
		} catch (error) {
			return res.status(500).json({
				error: error.message
			});
		}
	}

	static async getProductById(req, res) {
		try {
			const {
				id
			} = req.params;
			// const product = await _product.default.findById(id);
			if (!product) return res.status(404).json({
				error: 'Product not found'
			});
			return res.status(200).json({
				product
			});
		} catch (error) {
			return res.status(500).json({
				error: error.message
			});
		}
	}
}

export default ProductController;
