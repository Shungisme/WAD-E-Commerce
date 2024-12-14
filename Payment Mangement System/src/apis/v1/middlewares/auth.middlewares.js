const jwt = require("jsonwebtoken");
require("dotenv").config();


const secretKey = process.env.SYSTEM_SIGNER_KEY;

const jwtVerifier = (req, res, next) => {
  const token = req.headers["payment-system-auth"];

  if (!token) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);

    req.decodedToken = decodedToken;

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = jwtVerifier;
