import JWTHelper from "../../../helpers/jwt.helper.js";
import { StatusCodes } from "http-status-codes";

const isAuthorized = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: 'Unauthorized'
			});
		}
		const decoded = await JWTHelper.verifyToken(token, process.env.ACCESS_TOKEN_SECRET_SIGNATURE);
		req.userInformation = decoded.user;
		next();
	} catch (error) {
		if (error.message?.includes('jwt expired')) {
			return res.status(StatusCodes.GONE).json({
				message: 'Need to refresh token'
			});
		}

		return res.status(StatusCodes.UNAUTHORIZED).json({
			message: 'Unauthorized'
		});
	}
}

const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
};


export { isAuthorized, isAuthenticated };