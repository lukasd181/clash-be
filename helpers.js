"use strict";
const jwt = require("jsonwebtoken");

const utilHelpers = {
  sendResponse(res, status, success, data, errors, message) {
    const response = {};
    if (success) response.success = success;
    if (data) response.data = data;
    if (errors) response.errors = errors;
    if (message) response.message = message;
    return res.status(status).send(response);
  },
  catchAsync: (func) => (req, res, next) => {
    func(req, res, next).catch((error) => next(error));
  },
  AppError: class extends Error {
    constructor(statusCode, message, errorType) {
      super(message);
      this.statusCode = statusCode;
      this.errorType = errorType;

      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  },
  generateToken(userId) {
    const token = jwt.sign({ userId }, "secret", {
      expiresIn: "24h",
    });
    console.log("TOKEN: ", token);
    return token;
  },
};

module.exports = utilHelpers;
