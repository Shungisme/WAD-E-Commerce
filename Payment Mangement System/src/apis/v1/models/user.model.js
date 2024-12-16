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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "email",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
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

User.findByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

module.exports = User;
