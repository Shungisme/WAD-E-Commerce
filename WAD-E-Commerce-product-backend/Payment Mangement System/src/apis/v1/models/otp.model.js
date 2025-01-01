const { sequelize } = require("../../../configs/db");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const Otp = sequelize.define(
  "Otp",
  {
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
      field: "code",
    },

    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "expired_at",
    },

    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      field: "user_id",
    },
  },
  {
    tableName: "otp",
    timestamps: false,
  }
);

Otp.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Otp.findByUserId = async (userId) => {
  return await Otp.findOne({ where: { userId } });
};

module.exports = Otp;
