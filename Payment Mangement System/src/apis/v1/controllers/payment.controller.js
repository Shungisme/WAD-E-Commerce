const User = require("../models/user.model");
const Otp = require("../models/otp.model");
const Payment = require("../models/payment.model");
const ApplicationError = require("../../../error/cerror");
const errorCode = require("../../../error/errorCode");

const ec = errorCode.ErrorCode;

const verifyOtp = async (otp) => {
  const otpData = await Otp.findByPk(otp);

  if (!otpData || otpData.expiredAt < new Date()) {
    throw new ApplicationError(ec.INVALID_OTP);
  }

  return otpData;
};

const createPayment = async (req, res, next) => {
  const { totalAmount, orderId, otp } = req.body;
  const decodedTokenUser = req.decodedToken;

  try {
    const otpData = verifyOtp(otp);

    if (decodedTokenUser.userId !== otpData.userId) {
      throw new ApplicationError(ec.INVALID_OTP);
    }

    Otp.destroy({ where: { code: otp } });

    const user = await User.findByPk(otpData.userId);

    const payment = await Payment.create({
      userId: user.id,
      orderId: orderId,
      totalAmount: totalAmount,
      paidAt: new Date(),
    });

    user.balance = user.balance - totalAmount;

    await User.update(user);

    res.status(201).json({ message: "Payment successful", payment });
  } catch (err) {
    next(err);
  }
};

module.exports = createPayment;
