const sendResponse = require("../handlers/response.handler");
const Topic = require("../models/Topic");

exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.aggregate([
      {
        $project: {
          topicId: "$_id",
          topicName: "$name",
          description: 1,
        },
      },
    ]);
    return sendResponse(
      res,
      200,
      true,
      "Fetched topics successfully!!!",
      topics
    );
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, false, "Failed to fetch topics!!!");
  }
};
