const { sequelize } = require("../../../configs/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  balance: {
    type: DataTypes.BIGINT,
    defaultValue: BigInt("999999999999999999"),
  },
});

module.exports = User;
