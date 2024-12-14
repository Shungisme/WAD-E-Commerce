const nodemailer = require("nodemailer");
const Otp = require("../models/otp.model");
const User = require("../models/user.model");

const letters = "qwe12rTYuiop3456asDf8ghjkl90zxcvtydbnmQWERUIOPASFGHJKLZXCVBNM";

const generateOtp = (len) => {
  let otp = "";
  for (let i = 0; i < len; i++) {
    otp += letters[Math.floor(Math.random() * letters.length)];
  }
  return otp;
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendOtp = async (req, res, next) => {
  const { email } = req.decodedToken;
  const otp = generateOtp(6);

  try {
    const expiredAt = new Date();
    expiredAt.setMinutes(expiredAt.getMinutes() + 5);

    const user = await User.findByEmail(email);

    await Otp.create({
      code: otp,
      expiredAt,
      userId: user.id,
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || "noreply@example.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}\nThis code will expire in 5 minutes.`,
      html: `<p>Your OTP code is: <strong>${otp}</strong></p><p>This code will expire in 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP has been sent to your email" });
  } catch (error) {
    next(error);
  }
};

module.exports = sendOtp;
