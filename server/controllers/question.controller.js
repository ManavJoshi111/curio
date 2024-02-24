const sendResponse = require("../handlers/response.handler");
const Question = require("../models/Question");
const { questionValidator } = require("../validators/");

// Get all questions of user
// exports.getQuestionsByUser = async (req, res) => {
//   const { _id: userId } = req.query;
//   try {
//     const questions = await Question.find({ userId })
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);
//     sendResponse(
//       res,
//       200,
//       true,
//       "Fetched questions successfully!!!",
//       questions
//     );
//   } catch (err) {
//     console.log(err);
//     sendResponse(res, 500, false, "Failed to fetch questions!!!");
//   }
// };

// Get all questions
exports.getQuestions = async (req, res) => {
  const { skip, limit, userId } = req.query;

  const filter = {};

  if (userId && userId.trim() !== "") {
    Object.assign(filter, { userId });
  }

  try {
    const questions = await Question.find(filter)
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    sendResponse(
      res,
      200,
      true,
      "Fetched questions successfully!!!",
      questions
    );
  } catch (err) {
    console.log(err);
    sendResponse(res, 500, false, "Failed to fetch questions!!!");
  }
};

// Get a single question by ID
exports.getQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findOne({ _id: id });
    if (!question) {
      return sendResponse(res, 404, false, "Question not found");
    }
    sendResponse(res, 200, true, "Question fetched successfully", question);
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to fetch question");
  }
};

// Add a new question
exports.addQuestion = async (req, res) => {
  const { content } = req.body;
  const { _id: userId } = req.user;

  const { error } = questionValidator.validate(req.body);

  if (error) {
    console.error("Validation Error: ", error);
    return sendResponse(res, 400, false, error.details[0].message);
  }

  try {
    const question = new Question({ content, userId });

    await question.save();

    console.log("after saving...", question);
    return sendResponse(
      res,
      201,
      true,
      "Question added successfully",
      question
    );
    
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, false, "Failed to add question");
  }
};

// Update a question by ID
exports.updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  try {
    const question = await Question.findOneAndUpdate(
      { _id: id, userId },
      { content: req.body.content },
      { returnDocument: "after" }
    );
    if (!question) {
      return sendResponse(res, 404, false, "Question not found");
    }
    sendResponse(res, 200, true, "Question updated successfully", question);
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to update question");
  }
};

// Delete a question by ID
exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  try {
    const question = await Question.findOneAndDelete({ _id: id, userId });
    if (!question) {
      return sendResponse(res, 404, false, "Question not found");
    }
    sendResponse(res, 200, true, "Question deleted successfully");
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to delete question");
  }
};
