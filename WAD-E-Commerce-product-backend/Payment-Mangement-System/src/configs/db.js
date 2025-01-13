const { Sequelize } = require("sequelize");
require("dotenv").config();

const HOST = process.env.MYSQL_HOST;
const PORT = process.env.MYSQL_PORT;
const USER = process.env.MYSQL_USER;
const PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;

const sequelize = new Sequelize(MYSQL_DATABASE, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: "mysql",
  timezone: "+07:00",
  ssl: {
    rejectUnauthorized: false,
  }
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
