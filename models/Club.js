const mongoose = require("mongoose");
const { Schema } = mongoose;

const clubSchema = Schema({
  userRef: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: { type: Number },
  activities: {
    type: [mongoose.Types.ObjectId],
    ref: "Activity",
    required: true,
  },
  website: { type: String },
});

const Club = mongoose.Model("Club", clubSchema);

module.exports = {
  Club,
};
