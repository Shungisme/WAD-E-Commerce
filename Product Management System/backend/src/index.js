import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';
import database from './configs/database.js';
import RouterV1 from './apis/v1/routes/index.router.js';
import passport from './configs/passport.js';
// import { initializeProducts, initializeProductCategories } from './initDb.js';
dotenv.config();
database.connect();

const app = express();
app.use(cors());
app.use(session({ secret: process.env.SESSION_SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
	origin: ['http://localhost:3000', 'http://localhost:8080'],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	// credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


RouterV1(app);


app.get('/', (req, res) => {
	res.send('<a href="/auth/google">Authenticate with Google</a>');
});

// initializeProducts();
// initializeProductCategories();

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});