const express = require("express");
const router = express.Router();
const sendOtp = require("../controllers/otp.controller");

router.get("/otps", sendOtp);

module.exports = router;
