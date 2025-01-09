import User from '../models/user.model.js';
import { StatusCodes } from 'http-status-codes';
import JWTHelper from '../../../helpers/jwt.helper.js';
import bcrypt from 'bcrypt';
import verificationCodeModel from '../models/verification-code.model.js';
import SendMailHelper from '../../../helpers/sendMail.helper.js';
import GenerateHelper from '../../../helpers/generate.helper.js';

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

			if (user.status === 'inactive') {
				return res.status(StatusCodes.FORBIDDEN).json({
					message: 'User is inactive'
				});
			}

			if (user.status === 'unverified') {
				return res.status(StatusCodes.FORBIDDEN).json({
					code: 'ACCOUNT_NOT_VERIFIED',
					message: 'User is unverified'
				});
			}

			const userInformation = {
				user: {
					_id: user._id,
					email: user.email,
					name: user.name,
					role: user.role,
					avatar: user?.avatar
				}
			};

			const accessToken = await JWTHelper.generateToken(userInformation, process.env.ACCESS_TOKEN_SECRET_SIGNATURE, process.env.ACCESS_TOKEN_LIFE_TIME);
			const refreshToken = await JWTHelper.generateToken(userInformation, process.env.REFRESH_TOKEN_SECRET_SIGNATURE, process.env.REFRESH_TOKEN_LIFE_TIME);
			req.session.loginMethod = "local";

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

			const verificationCode = new verificationCodeModel({
				email,
				type: 'verify'
			});
			await verificationCode.save();

			const sendMailHelper = new SendMailHelper();
			sendMailHelper.sendVerificationCode(email, verificationCode.code, 'verify');

			res.status(StatusCodes.CREATED).json({
				_id: user._id,
				message: 'User created successfully, please verify your email.'
			});


		}
		catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async updateUser(req, res) {
		try {
			const { id } = req.params;

			if (req.body.password) {
				const salt = await bcrypt.genSalt(13);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			}

			const user = await User.findByIdAndUpdate(id, req.body, { new: true });
			if (!user) return res.status(StatusCodes.NOT_FOUND).json({
				message: 'User not found'
			});
			res.status(StatusCodes.OK).json({
				user
			});
		}
		catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async deleteUser(req, res) {
		try {
			const { id } = req.params;
			const user = await User.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
			if (!user) return res.status(StatusCodes.NOT_FOUND).json({
				message: 'User not found'
			});
			res.status(StatusCodes.OK).json({
				message: 'User deleted successfully'
			});
		}
		catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async changePassword(req, res) {
		debugger;
		try {
			const id = req.userInformation._id;
			const email = req.userInformation.email;
			const { oldPassword, newPassword, code } = req.body;

			if (!oldPassword || !newPassword || !code) {
				return res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing required fields" });
			}

			if (oldPassword === newPassword) {
				return res.status(StatusCodes.BAD_REQUEST).json({ message: "New password must be different from the old password" });
			}

			const checkCode = await verificationCodeModel.findOne({ email, code, type: 'change-password' });
			if (!checkCode) {
				return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid verification code" });
			}

			const user = await User.findById(id);
			if (!user) {
				return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
			}

			if (!(await bcrypt.compare(oldPassword, user.password))) {
				return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid old password" });
			}

			const salt = await bcrypt.genSalt(13);
			const hashedPassword = await bcrypt.hash(newPassword, salt);

			await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
			await verificationCodeModel.findOneAndDelete({ code, type: 'change-password' });

			res.status(StatusCodes.OK).json({ message: "Password changed successfully" });
		}
		catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
		}
	}

	static async logout(req, res) {
		const method = req.session.loginMethod;
		if (method === 'google') {
			try {
				await new Promise((resolve, reject) => {
					req.logout((err) => {
						if (err) {
							reject(err);
						}
						resolve();
					});
				});

				await new Promise((resolve, reject) => {
					req.session.destroy((err) => {
						if (err) {
							reject(err);
						}
						resolve();
					});
				});

				res.status(StatusCodes.OK).json({
					message: 'Logout successfully'
				});
			} catch (error) {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
			}
		}
		else {
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

	}

	static async refreshToken(req, res) {
		try {
			const { refreshToken } = req.body;

			if (!refreshToken) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: 'Missing required fields'
				});
			}

			const decoded = await JWTHelper.verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET_SIGNATURE);

			const userInformation = {
				user: decoded.user
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

	static async getCurrentUser(req, res) {
		try {
			const id = req.userInformation._id;
			const user = await User.findById(id).select('-password');;
			if (!user) {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: 'User not found'
				});
			}
			res.status(StatusCodes.OK).json({
				user
			});
		}
		catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async getAllUsers(req, res) {
		try {
			const users = await User.find().select('-password');
			res.status(StatusCodes.OK).json({
				users
			});
		}
		catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}
}


export default UserController;