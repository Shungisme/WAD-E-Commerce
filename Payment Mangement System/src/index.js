const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { sequelize, mysqlConnection } = require("./configs/db");
const init = require("./configs/init");
const ApplicationError = require("./error/cerror");
const errorCode = require("./error/errorCode");
const jwtVerifier = require("./apis/v1/middlewares/auth.middlewares");

require("dotenv").config();

const PORT = process.env.PORT || 3001;
const ec = errorCode.ErrorCode;

const app = express();

app.use("/", jwtVerifier);

app.use((req, res, next) => {
  res
    .status(ec.PAGE_NOT_FOUND.statusCode)
    .json(new ApplicationError(ec.PAGE_NOT_FOUND));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode
    ? err.statusCode
    : ec.SERVER_ERROR.statusCode;
  res.status(statusCode).json({
    error:
      statusCode === ec.SERVER_ERROR.statusCode
        ? new ApplicationError(ec.SERVER_ERROR)
        : new ApplicationError(err),
  });
});

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app
);

sslServer.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
  await mysqlConnection();
  await init();
});
