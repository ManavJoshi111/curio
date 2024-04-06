const sendResponse = require("../handlers/response.handler");
const { generateObjectId } = require("../utils");
const Answer = require("../models/Answer");
const { answerValidator } = require("../validators");

// Get all answers
// exports.getAnswersByUser = async (req, res) => {
//   const { _id: userId } = req.user;
//   try {
//     const answers = await Answer.find({ userId });
//     sendResponse(
//       res,
//       200,
//       true,
//       "Fetched answers by user successfully!!!",
//       answers
//     );
//   } catch (err) {
//     console.log(err);
//     sendResponse(res, 500, false, "Failed to fetch answers!!!");
//   }
// };

exports.getAnswers = async (req, res) => {
  const { questionId, userId, skip, limit } = req.query;

  const filter = {};

  if (!questionId && !userId) {
    return sendResponse(res, 400, false, "questionId or userId is required!!!");
  }

  if (questionId && questionId.trim() !== "") {
    Object.assign(filter, { questionId });
  }

  if (userId && userId.trim() !== "") {
    Object.assign(filter, { userId });
  }

  try {
    const answers = await Answer.find(filter)
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    return sendResponse(
      res,
      200,
      true,
      "Fetched answers by question successfully!!!",
      answers
    );
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, false, "Failed to fetch answers!!!");
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
  const { error } = answerValidator.validate(req.body);

  if (error) {
    console.error("Validation Error: ", error);
    return sendResponse(res, 400, false, error.details[0].message);
  }

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
  const { error } = answerValidator.validate(req.body);

  if (error) {
    console.error("Validation Error: ", error);
    return sendResponse(res, 400, false, error.details[0].message);
  }

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

exports.getAnswerByQuestion = async (req, res) => {
  try {
    const { id: questionId } = req.params;

    const answers = await Answer.aggregate([
      { $match: { questionId: generateObjectId(questionId) } },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 1,
          content: 1,
          createdAt: 1,
          user: {
            _id: 1,
            name: 1,
            email: 1,
            profilePic: 1,
          },
        },
      },
    ]);
    sendResponse(
      res,
      200,
      true,
      "Fetched answers by question successfully!!!",
      answers
    );
  } catch (err) {
    console.log("Err: ", err);
    sendResponse(res, 500, false, "Failed to fetch answers!");
  }
};
