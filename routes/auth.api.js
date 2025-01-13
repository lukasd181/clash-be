const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const validationMiddleware = require("../middlewares/validationMiddleware");

authRouter.post(
  "/register",
  validationMiddleware.validateRegister,
  authController.register
);
authRouter.post(
  "/login",

  authController.login
);

module.exports = {
  authRouter,
};
