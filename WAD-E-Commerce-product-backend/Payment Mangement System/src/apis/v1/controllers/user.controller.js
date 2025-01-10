const User = require("../models/user.model");
const ApplicationError = require("../../../error/cerror");
const errorCode = require("../../../error/errorCode");

const ec = errorCode.ErrorCode;

const getUserPaymentAccount = async (req, res, next) => {
  const decodedTokenUser = req.decodedToken;
  try {
    let user = await User.findByPk(decodedTokenUser.userId);

    console.log(user);
    if (!user) {
      user = await User.create({
        id: decodedTokenUser.userId,
      });
    }

    res.status(200).json(user);
  } catch (error) {
    return next(new ApplicationError(ec.SERVER_ERROR));
  }
};

module.exports = getUserPaymentAccount;
