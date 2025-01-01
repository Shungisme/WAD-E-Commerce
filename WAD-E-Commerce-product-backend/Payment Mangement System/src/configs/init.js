const User = require("../apis/v1/models/user.model");
require("dotenv").config();

const MONEY_RECEIVER_EMAIL = process.env.MONEY_RECEIVER_EMAIL;

const init = async () => {
  User.findByEmail(MONEY_RECEIVER_EMAIL).then(async (user) => {
    if (!user) {
      await User.create({
        email: MONEY_RECEIVER_EMAIL,
        name: "Money Receiver",
        balance: BigInt(0),
      });
    }
  });
};

module.exports = init;
