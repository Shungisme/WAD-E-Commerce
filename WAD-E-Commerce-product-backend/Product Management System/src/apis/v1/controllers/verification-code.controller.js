import { StatusCodes } from 'http-status-codes';
import VerificationCode from '../models/verification-code.model.js';
import User from '../models/user.model.js';
import SendMailHelper from '../../../helpers/sendMail.helper.js';

class VerificationCodeController {
	static async sendVerificationCode(req, res) {
		try {
			const { email, type } = req.body;
			if (!email || !type) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: 'Missing required fields'
				});
			}

			await VerificationCode.findOneAndDelete({ email, type });

			const verificationCode = new VerificationCode({
				email,
				type
			});

			await verificationCode.save();

			const sendMailHelper = new SendMailHelper();
			sendMailHelper.sendVerificationCode(email, verificationCode.code, type);

			res.status(StatusCodes.CREATED).json({
				message: 'Verification code sent'
			});
		} catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async verifyAccount(req, res) {
		try {
			const { email, code } = req.body;

			if (!email || !code) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: 'Missing required fields'
				});
			}

			const verificationCode = await VerificationCode.findOne({ email, code, type: 'verify' });

			if (!verificationCode) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: 'Invalid verification code'
				});
			}

			await VerificationCode.findOneAndDelete({ email, code, type: 'verify' });
			await User.findOneAndUpdate({ email }, { status: 'active' });

			res.status(StatusCodes.OK).json({
				message: 'Verification successful'
			});
		} catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}
}


export default VerificationCodeController;