const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    entityType: {
      type: String,
      enum: ["topic", "space"],
      required: true
    }
  },
  { timestamps: true }
);

const Follower = mongoose.model("Follower", followerSchema);
module.exports = Follower;
