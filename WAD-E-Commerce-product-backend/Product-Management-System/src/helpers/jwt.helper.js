import JWT from "jsonwebtoken";

class JWTHelper {
	static async generateToken(payload, secretSignature, tokenLife) {
		try {
			return JWT.sign(payload, secretSignature, {
				expiresIn: tokenLife,
			});
		}
		catch (error) {
			throw new Error(`Failed to generate token: ${error.message}`);
		}
	}

	static async generateTokenForPaymentSystem(payload, secretSignature) {
		try {
			return JWT.sign(payload, secretSignature);
		}
		catch (error) {
			throw new Error(`Failed to generate token: ${error.message}`);
		}
	}

	static async verifyToken(token, secretSignature) {
		try {
			return JWT.verify(token, secretSignature);
		} catch (error) {
			throw new Error(error);
		}
	}
}

export default JWTHelper;