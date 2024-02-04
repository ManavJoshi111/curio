const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     min: [2, "Name should have at least 2 characters!"],
//     max: 255,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   otp: {
//     type: String,
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
// });

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: [2, "Name should have at least 2 characters!"],
      max: 255,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    otp: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      default: null
    },
    bio: {
      type: String
    },
    topics: [
      {
        topicId: {
          type: mongoose.Types.ObjectId,
          ref: "Topic",
          required:true
        },
        topicName: {
          type: String,
          required:true
        }
      }
    ],
    role: {
      type: String,
      enum: ["user", "moderator", "admin"],
      default: "user"
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
