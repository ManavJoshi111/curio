const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    spaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "content reviewer", "moderator", "contributor"],
      required: true
    }
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
