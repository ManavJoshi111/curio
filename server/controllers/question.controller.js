const { getQuestionsByCondition } = require("../DB/queries/Question");
const sendResponse = require("../handlers/response.handler");
const {
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_LIMIT,
} = require("../utils/constants");
const { generateObjectId } = require("../utils/index");
const { questionValidator } = require("../validators/");
const Question = require("../models/Question");

// Get all questions of user
// exports.getQuestionsByUser = async (req, res) => {
// const { _id: userId } = req.query;
// try {
//   const questions = await Question.find({ userId })
//     .sort({ createdAt: -1 })
//     .skip(skip)
//     .limit(limit);
//   sendResponse(
//     res,
//     200,
//     true,
//     "Fetched questions successfully!",
//     questions
//   );
// } catch (err) {
//   console.log(err);
//   sendResponse(res, 500, false, "Failed to fetch questions!");
// }
// };

// Get question titles by user
exports.getQuestionTitlesByUser = async (req, res) => {
  let { page, limit } = req.query;
  page = +page || PAGINATION_DEFAULT_PAGE;
  limit = +limit || PAGINATION_LIMIT;
  try {
    const [queryData, queryCount] = await Promise.all([
      getQuestionsByCondition(
        { userId: req.user._id },
        { title: 1, createdAt: 1 }
      ),
      getQuestionsByCondition(
        { userId: req.user._id },
        { title: 1, createdAt: 1 },
        true,
        { createdAt: -1 },
        page,
        limit
      ),
    ]);
    const response = {
      data: queryData,
      totalRecords: +queryCount?.[0].totalRecords || 0,
      page: +page,
      limit: +limit,
      totalPages: Math.ceil(queryCount?.[0].totalRecords / limit) || 0,
    };
    sendResponse(
      res,
      200,
      true,
      "Fetched question titles successfully!",
      response
    );
  } catch (err) {
    console.log(err);
    sendResponse(res, 500, false, "Failed to fetch question titles!");
  }
};

// Get all questions
exports.getQuestions = async (req, res) => {
  const { skip, limit, userId } = req.query;

  const filter = {};

  if (userId && userId.trim() !== "") {
    Object.assign(filter, { userId });
  }

  try {
    const questions = await getQuestionsByCondition(
      filter,
      {},
      false,
      { createdAt: -1 },
      skip ? parseInt(skip) : 1,
      limit ? parseInt(limit) : 10
    );

    sendResponse(res, 200, true, "Fetched questions successfully!", questions);
  } catch (err) {
    console.log(err);
    sendResponse(res, 500, false, "Failed to fetch questions!");
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

// Get all questions based on given topics
exports.getQuestionByTopics = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { topics } = req.body;
    const condition = {
      topicIds: {
        $in: topics.map((topic) => generateObjectId(topic)),
      },
    };
    const [queryData, queryCount] = await Promise.all([
      getQuestionsByCondition(
        condition,
        {},
        false,
        { createdAt: -1 },
        page || 1,
        limit || 10
      ),
      getQuestionsByCondition(condition, {}, true),
    ]);
    const response = {
      data: queryData,
      totalRecords: +queryCount?.[0].totalRecords || 0,
      page: +page,
      limit: +limit,
      totalPages: Math.ceil(queryCount?.[0].totalRecords / limit) || 0,
    };
    sendResponse(res, 200, true, "Questions fetched successfully", response);
  } catch (err) {
    console.log("Err: ", err);
    sendResponse(res, 500, false, "Failed to fetch questions!");
  }
};

// Add a new question
exports.addQuestion = async (req, res) => {
  const { title, content, topicIds } = req.body;
  const { _id: userId } = req.user;

  const { error } = questionValidator.validate(req.body);

  if (error) {
    console.error("Validation Error: ", error);
    return sendResponse(res, 400, false, error.details[0].message);
  }

  try {
    const question = new Question({
      title,
      content,
      userId,
      topicIds: topicIds.map((topic) => generateObjectId(topic.topicId)),
    });

    await question.save();
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
      { title: req.body.content, content: req.body.content },
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
