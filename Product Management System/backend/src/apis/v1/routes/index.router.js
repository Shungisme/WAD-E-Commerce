import productRouter from '../routes/product.router.js';
import userRouter from '../routes/user.router.js';
import authRouter from '../routes/auth.router.js';

const RouterV1 = (app) => {
	const version = 'api/v1';
	app.use(`/${version}`, userRouter);
	app.use(`/auth`, authRouter);
	app.use(`/${version}/products`, productRouter);
}

export default RouterV1;