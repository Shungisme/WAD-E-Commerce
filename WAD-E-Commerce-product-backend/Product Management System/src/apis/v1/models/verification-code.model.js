import mongoose from "mongoose";
import GenerateHelper from "../../../helpers/generate.helper.js";

const verificationCodeSchema = new mongoose.Schema({
	gmail: {
		type: String,
		required: true
	},
	code: {
		type: String,
		default: () => GenerateHelper.generateRandomCode(6)
	},
	type: {
		type: String,
		required: true,
		enum: ['verify', 'change-password', 'reset-password']
	},
	expiredAt: {
		type: Date,
		default: () => new Date(Date.now() + 5 * 60 * 1000),
		index: { expires: 0 }
	}
},
	{
		timestamps: true
	}
);


export default mongoose.model('VerificationCode', verificationCodeSchema, 'verification-codes');