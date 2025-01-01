const User = require("../apis/v1/models/user.model");
require("dotenv").config();

const MONEY_RECEIVER_ID = process.env.MONEY_RECEIVER_ID;

const init = async () => {
  User.findByPk(MONEY_RECEIVER_ID).then(async (user) => {
    if (!user) {
      await User.create({
        id: MONEY_RECEIVER_ID,
        balance: BigInt(0),
      });
    }
  });
};

module.exports = init;
