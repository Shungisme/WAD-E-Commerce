import express from 'express';
import dotenv from 'dotenv';
import config from './configs/database.js';
import RouterV1 from './apis/v1/routes/index.router.js';

dotenv.config();
config.connect();

const app = express();
const PORT = 3000;

app.use(express.json());

RouterV1(app);


app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(PORT, () => {
	console.log('Server is running on port 3000');
});