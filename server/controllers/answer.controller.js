const sendResponse = require("../handlers/response.handler");
const Answer = require("../models/Answer");

// Get all answers
exports.getAnswersByUser = async (req, res) => {
  const { _id: userId } = req.user;
  try {
    const answers = await Answer.find({ userId });
    sendResponse(
      res,
      200,
      true,
      "Fetched answers by user successfully!!!",
      answers
    );
  } catch (err) {
    console.log(err);
    sendResponse(res, 500, false, "Failed to fetch answers!!!");
  }
};

exports.getAnswerByQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    const answers = await Answer.find({ questionId });
    sendResponse(
      res,
      200,
      true,
      "Fetched answers by question successfully!!!",
      answers
    );
  } catch (err) {
    console.log(err);
    sendResponse(res, 500, false, "Failed to fetch answers!!!");
  }
};

// Get a single answer by ID
exports.getAnswer = async (req, res) => {
  const { id } = req.params;
  try {
    const answer = await Answer.findOne({ _id: id });
    if (!answer) {
      return sendResponse(res, 404, false, "Answer not found");
    }
    sendResponse(res, 200, true, "Answer fetched successfully", answer);
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to fetch answer");
  }
};

// Add a new answer
exports.addAnswer = async (req, res) => {
  const { content, questionId } = req.body;
  const { _id: userId } = req.user;
  try {
    const answer = new Answer({ content, questionId, userId });
    const newAnswer = await answer.save();
    sendResponse(res, 201, true, "Answer added successfully", newAnswer);
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to add answer");
  }
};

// Update a answer by ID
exports.updateAnswer = async (req, res) => {
  const { id } = req.params;
  const { content, questionId } = req.body;
  const { _id: userId } = req.user;
  try {
    const answer = await Answer.findOneAndUpdate(
      { _id: id, userId, questionId },
      { content },
      { returnDocument: "after" }
    );

    if (!answer) {
      return sendResponse(res, 404, false, "Answer not found");
    }

    sendResponse(res, 200, true, "Answer updated successfully", answer);
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to update answer");
  }
};

// Delete a answer by ID
exports.deleteAnswer = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  try {
    const answer = await Answer.findOneAndDelete({ _id: id, userId });

    if (!answer) {
      return sendResponse(res, 404, false, "Answer not found");
    }

    sendResponse(res, 200, true, "Answer deleted successfully");
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to delete answer");
  }
};
