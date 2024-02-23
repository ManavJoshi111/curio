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

    res.status(200).json({ message: "Topics fetched successfully", topics });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
