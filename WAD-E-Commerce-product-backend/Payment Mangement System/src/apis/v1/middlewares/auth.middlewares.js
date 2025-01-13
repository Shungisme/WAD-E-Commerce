const ApplicationError = require("../../../error/cerror");
const errorCode = require("../../../error/errorCode");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const ec = errorCode.ErrorCode;
const secretKey = process.env.SYSTEM_SIGNER_KEY;
const duration = process.env.TOKEN_DURATION;

const jwtVerifier = (req, res, next) => {
  const token = req.headers["payment-system-auth"];

  if (!token) {
    return res.status(401).json(new ApplicationError(ec.TOKEN_MISSING));
  }

  try {
    const iat = jwt.decode(token).iat;

    if (Date.now() - iat*1000 > duration) {
      console.log(Date.now())
      console.log(iat*1000)
      return res.status(401).json(new ApplicationError(ec.INVALID_TOKEN));
    }

    const decodedToken = jwt.verify(token, secretKey);

    req.decodedToken = decodedToken;

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json(new ApplicationError(ec.INVALID_TOKEN));
  }
};

module.exports = jwtVerifier;
