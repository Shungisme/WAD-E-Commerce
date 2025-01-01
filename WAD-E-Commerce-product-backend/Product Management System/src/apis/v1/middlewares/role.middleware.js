import { StatusCodes } from "http-status-codes";

const isAdmin = (req, res, next) => {
	if (req.userInformation.role === 'admin') {
		return next();
	}
	res.status(StatusCodes.FORBIDDEN).json({ message: 'No permission' });
}


export { isAdmin };