const express = require("express");
const router = express.Router();
const getUserPaymentAccount = require("../controllers/user.controller");

router.get("/", getUserPaymentAccount);

module.exports = router;
