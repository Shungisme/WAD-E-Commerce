import productRouter from '../routes/product.router.js';
import userRouter from '../routes/user.router.js';
import authRouter from '../routes/auth.router.js';
import roleRouter from '../routes/role.router.js';
import productCategoryRouter from '../routes/product-category.router.js';
import cartRouter from '../routes/cart.router.js';
import orderRouter from '../routes/order.router.js';

const RouterV1 = (app) => {
	const version = 'api/v1';
	app.use(`/auth`, authRouter);
	app.use(`/${version}`, userRouter);
	app.use(`/${version}/products`, productRouter);
	app.use(`/${version}/product-categories`, productCategoryRouter);
	app.use(`/${version}/roles`, roleRouter);
	app.use(`/${version}/carts`, cartRouter);
	app.use(`/${version}/orders`, orderRouter);

}

export default RouterV1;