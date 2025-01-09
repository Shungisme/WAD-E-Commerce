import { StatusCodes } from 'http-status-codes';
import verificationCodeModel from '../models/verification-code.model.js';
import SendMailHelper from '../../../helpers/sendMail.helper.js';

class VerificationCodeController {
	static async sendVerificationCode(req, res) {
		try {
			const { gmail, type } = req.body;
			if (!gmail || !type) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: 'Missing required fields'
				});
			}

			await verificationCodeModel.findOneAndDelete({ gmail, type });

			const verificationCode = new verificationCodeModel({
				gmail,
				type
			});

			await verificationCode.save();

			const sendMailHelper = new SendMailHelper();
			sendMailHelper.sendVerificationCode(gmail, verificationCode.code, type);

			res.status(StatusCodes.CREATED).json({
				message: 'Verification code sent'
			});
		} catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}
}


export default VerificationCodeController;