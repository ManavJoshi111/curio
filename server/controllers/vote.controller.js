const Vote = require("../models/Vote");
const sendResponse = require("../handlers/response.handler");
const { generateObjectId } = require("../utils");

// Toggle upvote for a question
exports.toggleUpvote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const existingVote = await Vote.findOne({
      userId,
      entityId: generateObjectId(id),
    });
    if (existingVote) {
      await Vote.deleteOne({ _id: existingVote._id });
      if (existingVote.voteType === "downvote") {
        const newVote = new Vote({ userId, entityId: id, voteType: "upvote" });
        await newVote.save();
      }
      return sendResponse(res, 200, true, "Success!", {
        upvoted: existingVote.voteType !== "upvote",
      });
    }
    const newVote = new Vote({ userId, entityId: id, voteType: "upvote" });
    await newVote.save();
    return sendResponse(res, 200, true, "Upvoted successfully", {
      upvoted: true,
    });
  } catch (error) {
    console.log("Error: ", error);
    sendResponse(res, 500, false, "Failed to toggle upvote");
  }
};

// Toggle downvote for a question
exports.toggleDownvote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const existingVote = await Vote.findOne({
      userId,
      entityId: generateObjectId(id),
    });
    if (existingVote) {
      await Vote.deleteOne({ _id: existingVote._id });
      if (existingVote.voteType === "upvote") {
        const newVote = new Vote({
          userId,
          entityId: id,
          voteType: "downvote",
        });
        await newVote.save();
      }
      return sendResponse(res, 200, true, "Success!", {
        downvoted: existingVote.voteType !== "downvote",
      });
    }
    const newVote = new Vote({ userId, entityId: id, voteType: "downvote" });
    await newVote.save();
    return sendResponse(res, 200, true, "Downvoted successfully", {
      downvoted: true,
    });
  } catch (error) {
    console.log("Error: ", error);
    sendResponse(res, 500, false, "Failed to toggle downvote");
  }
};

// Get all voters list
exports.getVoters = async (req, res) => {
  try {
    const { id } = req.params;
    const voters = await Vote.find({ entityId: id }).populate("userId");
    return sendResponse(res, 200, true, "Fetched voters successfully", voters);
  } catch (error) {
    return sendResponse(res, 500, false, "Failed to fetch voters");
  }
};
