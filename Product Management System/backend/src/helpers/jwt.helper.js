import JWT from "jsonwebtoken";

class JWTHelper {
	static generateToken(payload, secretSignature, tokenLife) {
		try {
			return JWT.sign(payload, secretSignature, {
				expiresIn: tokenLife,
			});
		}
		catch (error) {
			throw new ErrorEvent(error);
		}
	}

	static verifyToken(token, secretSignature) {
		try {
			return JWT.verify(token, secretSignature);
		} catch (error) {
			throw new Error(error);
		}
	}
}

export default JWTHelper;