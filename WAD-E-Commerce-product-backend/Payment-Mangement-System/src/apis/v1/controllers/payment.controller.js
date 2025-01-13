const User = require("../models/user.model");
const Otp = require("../models/otp.model");
const Payment = require("../models/payment.model");
const ApplicationError = require("../../../error/cerror");
const errorCode = require("../../../error/errorCode");
require("dotenv").config();

const ec = errorCode.ErrorCode;

const MONEY_RECEIVER_ID = process.env.MONEY_RECEIVER_ID;

const verifyOtp = async (otp) => {
  const otpData = await Otp.findByPk(otp);
  const now = new Date().toISOString();

  if (!otpData || otpData.expiredAt < now) {
    throw new ApplicationError(ec.INVALID_OTP);
  }

  return otpData;
};

const createPayment = async (req, res, next) => {
  const { totalAmount, orderId, otp } = req.body;
  const decodedTokenUser = req.decodedToken;

  try {
    const otpData = await verifyOtp(otp);

    if (decodedTokenUser.userId !== otpData.userId) {
      throw new ApplicationError(ec.INVALID_OTP);
    }

    Otp.destroy({ where: { code: otp } });

    const user = await User.findByPk(otpData.userId);

    const receiver = await User.findByPk(MONEY_RECEIVER_ID);

    const payment = await Payment.create({
      userId: user.id,
      orderId: orderId,
      totalAmount: totalAmount,
      paidAt: new Date(),
    });

    user.balance = user.balance - totalAmount;

    await User.update({ balance: user.balance }, { where: { id: user.id } });

    receiver.balance = receiver.balance + totalAmount;

    await User.update({ balance: receiver.balance }, { where: { id: receiver.id } });

    res.status(201).json({ message: "Payment successful", payment });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = createPayment;
