const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    spaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
    },
    role: {
      type: String,
      enum: ["admin", "moderator", "contributor", "follower"],
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
