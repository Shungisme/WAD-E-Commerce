import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import database from './configs/database.js';
import RouterV1 from './apis/v1/routes/index.router.js';
import passport from './configs/passport.js';

dotenv.config();
database.connect();

const app = express();
app.use(session({ secret: process.env.SESSION_SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


RouterV1(app);


app.get('/', (req, res) => {
	res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});