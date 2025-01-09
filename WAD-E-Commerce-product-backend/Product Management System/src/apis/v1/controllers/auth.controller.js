import { StatusCodes } from "http-status-codes";
import passport from "../../../configs/passport.js";
import JWTHelper from "../../../helpers/jwt.helper.js";
import { Avatar } from "@mui/material";

class AuthController {
	static auth = (req, res) => {
		passport.authenticate('google', { scope: ['email', 'profile'] });
	};

	static callBack = async (req, res) => {
		const user = req.user;

		req.session.loginMethod = "google";
		console.log("User authenticated via Google");

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
		req.session.accessToken = accessToken;
		req.session.refreshToken = refreshToken;
		res.redirect(`http://localhost:3000/users/oauth/google`);
	};

	static getCurrentUser = async (req, res) => {
		try {
			const accessToken = req.session.accessToken;
			const refreshToken = req.session.refreshToken;

			res.json({
				accessToken,
				refreshToken
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to get user information" });
		}
	};
}

export default AuthController;