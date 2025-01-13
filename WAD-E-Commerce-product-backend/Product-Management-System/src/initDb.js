import ProductCategory from './apis/v1/models/product-category.model.js';
import Product from './apis/v1/models/product.model.js';

const initializeProductCategories = async () => {
	try {
		// Main categories
		const mainCategories = [
			{
				title: "Sản phẩm giày",
				description: "Các loại giày dép thời trang và thể thao",
				parentSlug: "",
				status: "active"
			},
			{
				title: "Sản phẩm áo",
				description: "Các loại áo thời trang và thể thao",
				parentSlug: "",
				status: "active"
			},
			{
				title: "Sản phẩm quần",
				description: "Các loại quần thời trang và thể thao",
				parentSlug: "",
				status: "active"
			},
			{
				title: "Phụ kiện",
				description: "Các phụ kiện thời trang",
				parentSlug: "",
				status: "active"
			},
			{
				title: "Quà lưu niệm",
				description: "Các sản phẩm quà lưu niệm",
				parentSlug: "",
				status: "active"
			}
		];

		// Create main categories first
		const createdMainCategories = await Promise.all(
			mainCategories.map(async (category) => {
				const newCategory = new ProductCategory(category);
				await newCategory.save();
				return newCategory;
			})
		);

		// Sub-categories with their parent relationships
		const subCategories = [
			// Giày sub-categories
			{
				title: "Giày thời trang",
				description: "Giày thời trang các loại",
				parentSlug: createdMainCategories[0].slug,
				status: "active"
			},
			{
				title: "Giày chạy bộ",
				description: "Giày chuyên dụng cho chạy bộ",
				parentSlug: createdMainCategories[0].slug,
				status: "active"
			},
			{
				title: "Giày bóng đá",
				description: "Giày chuyên dụng cho bóng đá",
				parentSlug: createdMainCategories[0].slug,
				status: "active"
			},
			{
				title: "Giày bóng rổ",
				description: "Giày chuyên dụng cho bóng rổ",
				parentSlug: createdMainCategories[0].slug,
				status: "active"
			},
			{
				title: "Giày trượt ván",
				description: "Giày chuyên dụng cho trượt ván",
				parentSlug: createdMainCategories[0].slug,
				status: "active"
			},

			// Áo sub-categories
			{
				title: "Áo gió",
				description: "Áo gió thể thao",
				parentSlug: createdMainCategories[1].slug,
				status: "active"
			},
			{
				title: "Áo thun",
				description: "Áo thun thể thao và thời trang",
				parentSlug: createdMainCategories[1].slug,
				status: "active"
			},
			{
				title: "Áo polo",
				description: "Áo polo thể thao và thời trang",
				parentSlug: createdMainCategories[1].slug,
				status: "active"
			},
			{
				title: "Áo nỉ",
				description: "Áo nỉ thể thao",
				parentSlug: createdMainCategories[1].slug,
				status: "active"
			},
			{
				title: "Áo khoác",
				description: "Áo khoác thể thao và thời trang",
				parentSlug: createdMainCategories[1].slug,
				status: "active"
			},

			// Quần sub-categories
			{
				title: "Quần gió",
				description: "Quần gió thể thao",
				parentSlug: createdMainCategories[2].slug,
				status: "active"
			},
			{
				title: "Quần short",
				description: "Quần short thể thao và thời trang",
				parentSlug: createdMainCategories[2].slug,
				status: "active"
			},
			{
				title: "Quần dài",
				description: "Quần dài thể thao và thời trang",
				parentSlug: createdMainCategories[2].slug,
				status: "active"
			},
			{
				title: "Quần nỉ",
				description: "Quần nỉ thể thao",
				parentSlug: createdMainCategories[2].slug,
				status: "active"
			},
			{
				title: "Quần thể thao",
				description: "Quần thể thao các loại",
				parentSlug: createdMainCategories[2].slug,
				status: "active"
			},

			// Phụ kiện sub-categories
			{
				title: "Tất",
				description: "Tất thể thao các loại",
				parentSlug: createdMainCategories[3].slug,
				status: "active"
			},
			{
				title: "Mũ",
				description: "Mũ thể thao và thời trang",
				parentSlug: createdMainCategories[3].slug,
				status: "active"
			},
			{
				title: "Balo",
				description: "Balo thể thao và thời trang",
				parentSlug: createdMainCategories[3].slug,
				status: "active"
			},
			{
				title: "Thắt lưng",
				description: "Thắt lưng thể thao và thời trang",
				parentSlug: createdMainCategories[3].slug,
				status: "active"
			},
			{
				title: "Đồng hồ",
				description: "Đồng hồ thể thao",
				parentSlug: createdMainCategories[3].slug,
				status: "active"
			},

			// Quà lưu niệm sub-categories
			{
				title: "Đĩa",
				description: "Đĩa lưu niệm",
				parentSlug: createdMainCategories[4].slug,
				status: "active"
			},
			{
				title: "Rubik",
				description: "Rubik các loại",
				parentSlug: createdMainCategories[4].slug,
				status: "active"
			},
			{
				title: "Cốc",
				description: "Cốc lưu niệm",
				parentSlug: createdMainCategories[4].slug,
				status: "active"
			},
			{
				title: "Túi sách",
				description: "Túi sách lưu niệm",
				parentSlug: createdMainCategories[4].slug,
				status: "active"
			},
			{
				title: "Vòng tay",
				description: "Vòng tay lưu niệm",
				parentSlug: createdMainCategories[4].slug,
				status: "active"
			}
		];

		// Create sub-categories
		await Promise.all(
			subCategories.map(async (category) => {
				const newCategory = new ProductCategory(category);
				await newCategory.save();
			})
		);

		console.log('Product categories initialized successfully');
	} catch (error) {
		console.error('Error initializing product categories:', error);
		throw error;
	}
};

const initializeProducts = async () => {
	try {
		const products = [
			// Sản phẩm giày
			{
				title: "Giày Nike Air Force 1 '07",
				description: "Giày thể thao Nike Air Force 1 '07 phiên bản mới nhất, thiết kế hiện đại",
				thumbnail: `/api/placeholder/400/300`,
				price: 2500000,
				quantity: 50,
				status: "active",
				discount: 10,
				categorySlug: "giay-thoi-trang",
				images: [
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`
				]
			},
			{
				title: "Giày Chạy Bộ Adidas Ultraboost",
				description: "Giày chạy bộ Adidas Ultraboost với công nghệ đệm boost mới nhất",
				thumbnail: `/api/placeholder/400/300`,
				price: 3200000,
				quantity: 30,
				status: "active",
				discount: 5,
				categorySlug: "giay-chay-bo",
				images: [
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`
				]
			},

			// Sản phẩm áo
			{
				title: "Áo Thun Nike Dri-FIT",
				description: "Áo thun thể thao Nike với công nghệ Dri-FIT, thoáng mát",
				thumbnail: `/api/placeholder/400/300`,
				price: 790000,
				quantity: 100,
				status: "active",
				discount: 0,
				categorySlug: "ao-thun",
				images: [
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`
				]
			},
			{
				title: "Áo Khoác Adidas WindBreaker",
				description: "Áo khoác gió Adidas chống nước, thiết kế thể thao",
				thumbnail: `/api/placeholder/400/300`,
				price: 1500000,
				quantity: 45,
				status: "active",
				discount: 15,
				categorySlug: "ao-khoac",
				images: [
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`
				]
			},

			// Sản phẩm quần
			{
				title: "Quần Short Nike Basketball",
				description: "Quần short bóng rổ Nike, thoáng khí và năng động",
				thumbnail: `/api/placeholder/400/300`,
				price: 650000,
				quantity: 75,
				status: "active",
				discount: 0,
				categorySlug: "quan-short",
				images: [
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`
				]
			},
			{
				title: "Quần Dài Adidas Training",
				description: "Quần dài tập luyện Adidas, co giãn tốt",
				thumbnail: `/api/placeholder/400/300`,
				price: 1200000,
				quantity: 60,
				status: "active",
				discount: 8,
				categorySlug: "quan-dai",
				images: [
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`
				]
			},

			// Phụ kiện
			{
				title: "Balo Nike Brasilia",
				description: "Balo thể thao Nike Brasilia, nhiều ngăn tiện dụng",
				thumbnail: `/api/placeholder/400/300`,
				price: 890000,
				quantity: 40,
				status: "active",
				discount: 0,
				categorySlug: "balo",
				images: [
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`
				]
			},
			{
				title: "Đồng Hồ Thể Thao Garmin Forerunner",
				description: "Đồng hồ thông minh Garmin Forerunner dành cho runner",
				thumbnail: `/api/placeholder/400/300`,
				price: 5500000,
				quantity: 25,
				status: "active",
				discount: 12,
				categorySlug: "dong-ho",
				images: [
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`
				]
			},

			// Quà lưu niệm
			{
				title: "Cốc Manchester United Limited",
				description: "Cốc sứ Manchester United phiên bản giới hạn",
				thumbnail: `/api/placeholder/400/300`,
				price: 250000,
				quantity: 100,
				status: "active",
				discount: 0,
				categorySlug: "coc",
				images: [
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`
				]
			},
			{
				title: "Vòng Tay Nike Just Do It",
				description: "Vòng tay cao su Nike với slogan Just Do It",
				thumbnail: `/api/placeholder/400/300`,
				price: 150000,
				quantity: 200,
				status: "active",
				discount: 0,
				categorySlug: "vong-tay",
				images: [
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`,
					`/api/placeholder/800/600`
				]
			}
		];

		// Create products
		await Promise.all(
			products.map(async (product) => {
				const newProduct = new Product(product);
				await newProduct.save();
			})
		);

		console.log('Products initialized successfully');
	} catch (error) {
		console.error('Error initializing products:', error);
		throw error;
	}
};


export { initializeProductCategories, initializeProducts };