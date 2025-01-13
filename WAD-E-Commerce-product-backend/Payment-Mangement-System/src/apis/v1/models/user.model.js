const { sequelize } = require("../../../configs/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      field: "id",
    },
    balance: {
      type: DataTypes.BIGINT,
      defaultValue: "999999999999999999",
      field: "balance",
    },
  },
  {
    tableName: "user",
    timestamps: false,
  }
);

module.exports = User;
