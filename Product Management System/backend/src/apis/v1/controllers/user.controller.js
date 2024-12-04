import User from '../models/user.model.js';
import { StatusCodes } from 'http-status-codes';
import JWTHelper from '../../../helpers/jwt.helper.js';
import bcrypt from 'bcrypt';

class UserController {
	static async login(req, res) {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: 'Missing required fields'
				});
			}

			const user = await User.findOne({ email });

			if (!user || !(await bcrypt.compare(password, user.password))) {
				return res.status(StatusCodes.UNAUTHORIZED).json({
					message: 'Invalid email or password'
				});
			};

			const userInformation = {
				_id: user._id,
				email: user.email,
				role: user.role
			};

			const accessToken = await JWTHelper.generateToken(userInformation, process.env.ACCESS_TOKEN_SECRET_SIGNATURE, process.env.ACCESS_TOKEN_LIFE_TIME);

			const refreshToken = await JWTHelper.generateToken(userInformation, process.env.REFRESH_TOKEN_SECRET_SIGNATURE, process.env.REFRESH_TOKEN_LIFE_TIME);

			res.status(StatusCodes.OK).json({
				accessToken,
				refreshToken
			});
		}
		catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async register(req, res) {
		try {
			const { name, email, password } = req.body;

			if (!name || !email || !password) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: 'Missing required fields'
				});
			}

			if (await User.findOne({ email })) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: 'Email already exists'
				});
			}

			const salt = await bcrypt.genSalt(13);
			const hashedPassword = await bcrypt.hash(password, salt);

			const user = new User({
				name,
				email,
				password: hashedPassword
			});
			await user.save();

			res.status(StatusCodes.CREATED).json({
				message: 'User created successfully'
			});
		}
		catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async logout(req, res) {
		try {
			res.status(StatusCodes.OK).json({
				message: 'Logout successfully'
			});
		}
		catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async refreshToken(req, res) {
		try {
			const { accessToken } = req.body;

			if (!accessToken) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: 'Missing required fields'
				});
			}

			const decoded = await JWTHelper.verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET_SIGNATURE);

			const userInformation = {
				_id: decoded._id,
				email: decoded.email,
				role: decoded.role
			};

			const newAccessToken = await JWTHelper.generateToken(userInformation, process.env.ACCESS_TOKEN_SECRET_SIGNATURE, process.env.ACCESS_TOKEN_LIFE_TIME);

			res.status(StatusCodes.OK).json({
				newAccessToken
			});
		}
		catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: `Refresh access token failed: ${error.message}`
			});
		}
	}
}


export default UserController;