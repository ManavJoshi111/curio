const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: [2, "Name should have at least 2 characters!"],
    max: 255,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
