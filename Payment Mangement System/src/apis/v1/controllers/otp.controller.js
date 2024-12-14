const Otp = require("../models/otp.model");

const random = new Random();
const letters = "qwe12rTYuiop3456asDf8ghjkl90zxcvtydbnmQWERUIOPASFGHJKLZXCVBNM";

const generateOtp = (len) => {
  let otp = "";

  for (let i = 0; i < len; i++) {
    otp += letters[random.nextInt(letters.length)];
  }

  return otp;
};

const sendOtp = async (req, res, next) => {
  const { userId } = req.decodedToken;
  const otp = generateOtp(6);

  try {
    const expiredAt = new Date();
    expiredAt.setMinutes(expiredAt.getMinutes() + 5);

    await Otp.create({
      code: otp,
      expiredAt,
      userId,
    });

    res.status(200).json({ message: "OTP has been sent" });
  } catch (error) {
    next(error);
  }
};
