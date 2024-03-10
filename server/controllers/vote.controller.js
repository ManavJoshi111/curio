const Vote = require("../models/Vote");

// Toggle upvote for a question
exports.toggleUpvote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const existingVote = await Vote.findOne({
      userId,
      entityId: id,
      voteType: "upvote",
    });
    if (existingVote) {
      await existingVote.remove();
      return sendResponse(res, 200, true, "Upvote removed successfully");
    } else {
      const newVote = new Vote({ userId, entityId: id, voteType: "upvote" });
      await newVote.save();
      return sendResponse(res, 200, true, "Upvoted successfully");
    }
  } catch (error) {
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
      entityId: id,
      voteType: "downvote",
    });
    if (existingVote) {
      await existingVote.remove();
      return sendResponse(res, 200, true, "Downvote removed successfully");
    } else {
      const newVote = new Vote({ userId, entityId: id, voteType: "downvote" });
      await newVote.save();
      return sendResponse(res, 200, true, "Downvoted successfully");
    }
  } catch (error) {
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
