const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    totalFollowers: {
      type: Number,
      default: 0
    },
    totalQuestions: {
      type: Number,
      default: 0
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member"
      }
    ],
    rules: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
);

const Space = mongoose.model("Space", spaceSchema);
module.exports = Space;
