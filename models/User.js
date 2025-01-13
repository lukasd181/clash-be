const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    tag: { type: String },
    email: { type: String, required: true },
    nickname: { type: String, required: true },
    birthday: { type: Date, required: true },
    location: {
      type: { type: String, enum: ["Point"] },
      coordinates: {
        type: [Number],
      },
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Non-binary", "Prefer not to disclose"],
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
