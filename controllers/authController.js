const {
  sendResponse,
  catchAsync,
  AppError,
  generateToken,
} = require("../helpers");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const joi = require("joi");

const authController = {
  register: catchAsync(async (req, res, next) => {
    const { username, password, email, nickname, birthday, gender, location } =
      req.body;
    const newUser = new User({
      username,
      password,
      email,
      nickname,
      birthday,
      gender,
      location,
    });
    await newUser.save();
    const token = generateToken(newUser._id);

    sendResponse(
      res,
      200,
      true,
      { newUser, token },
      null,
      "Successfully Created a User."
    );
  }),

  login: catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      throw new AppError(401, "Username does not exist.", "Unauthenticaed");

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (isCorrectPassword) {
      const userId = user._id;
      const token = generateToken(userId);
      sendResponse(res, 200, true, { userId, token });
    } else {
      throw new AppError(401, "Password does not match", "Unauthenticaed");
    }
  }),
};

module.exports = authController;
