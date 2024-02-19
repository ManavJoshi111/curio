const mongoose = require("mongoose");
const { ROLES } = require("../utils/constants");

const userSchema = new mongoose.Schema(
  {
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
    contactNo: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: null,
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
    },
    topics: [
      {
        topicId: {
          type: mongoose.Types.ObjectId,
          ref: "Topic",
          required: true,
        },
        topicName: {
          type: String,
          required: true,
        },
      },
    ],
    role: {
      type: String,
      enum: [...Object.values(ROLES)],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
