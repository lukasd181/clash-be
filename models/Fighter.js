const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./User");

const fighterSchema = new Schema({
  userRef: { type: Schema.Types.ObjectId, ref: "User", required: true },
  style: { type: String, required: true },
  division: {
    type: String,
    enum: [
      "Flyweight",
      "Bantamweight",
      "Featherweight",
      "Lightweight",
      "Welterweight",
      "Middleweight",
      "Light Heavyweight",
      "Heavyweight",
      "Super Heavyweight",
    ],
    required: true,
  },
});

const Fighter = mongoose.Model("Fighter", fighterSchema);

module.exports = {
  Fighter,
};
