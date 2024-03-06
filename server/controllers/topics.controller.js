const { getTopicsByCondition } = require("../DB/queries/Topic");
const sendResponse = require("../handlers/response.handler");

exports.getTopics = async (req, res) => {
  try {
    const topics = await getTopicsByCondition(
      {},
      {
        $project: {
          topicId: "$_id",
          topicName: "$name",
          description: 1,
        },
      }
    );
    return sendResponse(res, 200, true, "Fetched topics successfully!", topics);
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, false, "Failed to fetch topics!");
  }
};

exports.getTopicIds = async (req, res) => {
  try {
    const topicIds = await getTopicsByCondition(
      {},
      {
        topicId: "$_id",
      }
    );
    return sendResponse(
      res,
      200,
      true,
      "Fetched topic ids successfully!",
      topicIds
    );
  } catch (err) {
    sendResponse(res, 500, false, "Failed to fetch topic ids");
  }
};
