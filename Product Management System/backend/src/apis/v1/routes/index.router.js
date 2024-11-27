const productRouter = require('./product');

const RouterV1 = (app) => {
	const version = 'api/v1';

	app.use(`/${version}/products`, productRouter);
}

export default RouterV1;