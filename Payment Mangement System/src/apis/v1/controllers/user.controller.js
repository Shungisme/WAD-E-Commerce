const User = require("../models/user.model");
const ApplicationError = require("../../../error/cerror");
const errorCode = require("../../../error/errorCode");

const ec = errorCode.ErrorCode;

const getUserPaymentAccount = async (req, res) => {
  const decodedTokenUser = req.decodedToken;
  try {
    const user = await User.findByPk(decodedTokenUser.userId);
    if (!user) {
      user = await User.create(decodedTokenUser);
    }

    res.status(200).json({ balance: user.balance });
  } catch (error) {
    throw new ApplicationError(ec.SERVER_ERROR);
  }
};

module.exports = getUserPaymentAccount;
