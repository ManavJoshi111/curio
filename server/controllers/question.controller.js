const {
  getQuestionsByCondition,
  getQuestionWithAuthor,
  getUserFeed: getUserFeedQuery,
  searchQuestion: searchQuestionQuery,
} = require("../DB/queries/Question");
const sendResponse = require("../handlers/response.handler");
const {
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_DEFAULT_LIMIT,
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
  let { id: userId } = req.params;
  userId = userId ? generateObjectId(userId) : req.user._id; // userId is passed into params only if we are getting data of another user (not currently loggedIn user)
  let { page, limit } = req.query;
  page = +page || PAGINATION_DEFAULT_PAGE;
  limit = +limit || PAGINATION_DEFAULT_LIMIT;
  try {
    const [queryData, queryCount] = await Promise.all([
      getQuestionsByCondition(
        { userId },
        { title: 1, createdAt: 1 },
        false,
        { createdAt: -1 },
        page,
        limit
      ),
      getQuestionsByCondition({ userId }, { title: 1, createdAt: 1 }),
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
    const question = await getQuestionWithAuthor(id, req.user._id);
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

    // TODO : handle case when there are no questions for given topics

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
  try {
    const question = await Question.findOneAndUpdate(
      { _id: id },
      {
        title: req.body.title,
        content: req.body.content,
        topicIds: req.body.topicIds,
      },
      { returnDocument: "after", upsert: false }
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

exports.getUserFeed = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = +page || PAGINATION_DEFAULT_PAGE;
    limit = +limit || PAGINATION_DEFAULT_LIMIT;

    const { topics } = req.user;
    const condition = {
      topicIds: { $in: topics.map((topic) => topic.topicId) },
    };
    const [queryData, queryCount] = await Promise.all([
      getUserFeedQuery(
        condition,
        req.user._id,
        false,
        { createdAt: -1 },
        page,
        limit
      ),
      getUserFeedQuery(condition, req.user._id, true),
    ]);

    const response = {
      data: queryData,
      totalRecords: +queryCount?.[0]?.totalRecords || 0,
      page,
      limit,
      totalPages: Math.ceil(queryCount?.[0]?.totalRecords / limit) || 0,
    };

    sendResponse(
      res,
      200,
      true,
      "Fetched question titles successfully!",
      response
    );
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to fetch question titles");
  }
};

exports.searchQuestion = async (req, res) => {
  try {
    let { page, limit, content, date, topic } = req.query;
    page = +page || PAGINATION_DEFAULT_PAGE;
    limit = +limit || PAGINATION_DEFAULT_LIMIT;

    const condition = {};

    // Add content filter
    if (content) {
      condition.title = { $regex: content, $options: "i" };
    }

    // Add date filter
    if (date) {
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setDate(endOfDay.getDate() + 1);
      condition.createdAt = {
        $gte: startOfDay,
        $lt: endOfDay,
      };
    }

    const [queryData, queryCount] = await Promise.all([
      searchQuestionQuery(condition, false, page, limit),
      searchQuestionQuery(condition, true),
    ]);

    const response = {
      data: queryData,
      totalRecords: +queryCount?.[0]?.totalRecords || 0,
      page,
      limit,
      totalPages: Math.ceil(queryCount?.[0]?.totalRecords / limit) || 0,
    };

    sendResponse(
      res,
      200,
      true,
      "Fetched search results successfully!",
      response
    );
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to fetch search results");
  }
};
