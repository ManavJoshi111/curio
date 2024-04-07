const sendResponse = require("../handlers/response.handler");
const Comment = require("../models/Comment");
const Answer = require("../models/Answer");
const Question = require("../models/Question");
const { commentValidator } = require("../validators/comment.validator");

// add comment on a question/answer
exports.addComment = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { content } = req.body;
  const { entityType } = req.body;

  const { error } = commentValidator.validate(req.body);

  if (error) {
    return sendResponse(res, 400, false, error.details[0].message);
  }

  try {
    let entity = null;

    if (entityType === "Question") {
      entity = await Question.findById(id); // entity is question
    } else {
      entity = await Answer.findById(id); // entity is answer
    }

    if (!entity) {
      return sendResponse(res, 404, false, `${entityType} not found`);
    }

    const comment = new Comment({
      content,
      userId,
      entityId: id,
      entityType,
    });

    await comment.save();
    sendResponse(res, 201, true, "Comment added successfully", comment);
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to add comment");
  }
};

exports.addComment = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { content } = req.body;
  try {
    const comment = new Comment({
      content,
      userId,
      entityId: id,
      entityType: "Question",
    });
    await comment.save();
    sendResponse(res, 201, true, "Comment added successfully", comment);
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to add comment");
  }
};

// get comments on a question/answer
exports.getComments = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({
      entityId: id,
    })
      .populate("userId", "name email profilePic _id")
      .sort("-createdAt -updatedAt");
    sendResponse(res, 200, true, "Comments fetched successfully", comments);
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to fetch comments");
  }
};

// delete comment by ID
exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  try {
    const comment = await Comment.findOneAndDelete({ _id: id, userId });
    if (!comment) {
      return sendResponse(res, 404, false, "Comment not found");
    }
    sendResponse(res, 200, true, "Comment deleted successfully");
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to delete comment");
  }
};
