const { Sequelize } = require("sequelize");
require("dotenv").config();

const HOST = process.env.MYSQL_HOST;
const USER = process.env.MYSQL_USER;
const PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;

const sequelize = new Sequelize(MYSQL_DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: "mysql",
  timezone: "+07:00",
});

const mysqlConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  sequelize,
  mysqlConnection,
};
