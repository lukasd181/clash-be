const {
  sendResponse,
  catchAsync,
  AppError,
  generateToken,
} = require("../helpers");
const Joi = require("joi");

const validationMiddleware = {
  validateRegister: catchAsync(async (req, res, next) => {
    const registerValidationSchema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(6).required(),
      email: Joi.string().email().required(),
      nickname: Joi.string().max(50),
      birthday: Joi.date().iso(),
      gender: Joi.string().valid(
        "Male",
        "Female",
        "Non-binary",
        "Prefer not to disclose"
      ),
    });
    const { error } = registerValidationSchema.validate(req.body);
    console.log(error);
    if (error)
      throw new AppError(
        400,
        `Insufficient or Invalid register information: ${error.details[0]?.message}`,
        "Bad Request"
      );
    next();
  }),
};

module.exports = validationMiddleware;
