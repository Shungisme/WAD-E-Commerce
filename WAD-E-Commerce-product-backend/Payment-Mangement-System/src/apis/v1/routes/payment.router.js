const express = require("express");
const router = express.Router();
const {createPayment, getAllPayments} = require("../controllers/payment.controller");

router.post("/payments", createPayment);

router.get("/payments", getAllPayments);

module.exports = router;
