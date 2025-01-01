const { sequelize } = require("../../../configs/db");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      field: "id",
    },
    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      field: "user_id",
    },
    orderId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      field: "order_id",
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "paid_at",
    },
    totalAmount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "total_amount",
    },
  },
  {
    tableName: "payment",
    timestamps: false,
  }
);

Payment.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = Payment;
