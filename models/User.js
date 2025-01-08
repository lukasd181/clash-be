const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  tag: { type: String, required: true },
  email: { type: String, required: true },
  nickname: { type: String, required: true },
  birthday: { type: Date, required: true },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Non-binary", "Prefer not to disclose"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
