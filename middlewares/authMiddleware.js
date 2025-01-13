require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  sendResponse,
  catchAsync,
  AppError,
  generateToken,
} = require("../helpers");

const { TOKEN_PRIVATE_KEY } = process.env;

const authMiddleware = {
  authenticate: catchAsync(async (req, res, next) => {
    const { userId } = req.body;
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new AppError(401, "No JWT provided!", "Unauthenticated");

    const decoded = jwt.verify(token, TOKEN_PRIVATE_KEY, () => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          console.error("Invalid Token:", err.message);
          throw new AppError(401, "Token Error", "Unauthenticated");
        } else if (err.name === "TokenExpiredError") {
          console.error("Token Expired:", err.message);
          throw new AppError(401, "Token expired", "Unauthenticated");
        } else {
          console.error("Verification Error:", err);
          throw new AppError(401, "Verification Error", "Unauthenticated");
        }
      } else {
        return decoded;
      }
    });
    const user = await User.findById(decoded.id);
    if (!user) throw new AppError(401, "Invalid Token", "Unauthenticated");
    res.locals.user = {
      userId: user._id,
    };
    next();
  }),
};

module.exports = authMiddleware;
