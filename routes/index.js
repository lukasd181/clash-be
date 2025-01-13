const express = require("express");
const indexRouter = express.Router();

const { authRouter } = require("./auth.api");
indexRouter.use("/auth", authRouter);

module.exports = {
  indexRouter,
};
