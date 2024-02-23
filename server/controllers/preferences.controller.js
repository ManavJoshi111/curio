const Topic = require("../models/Topic");

exports.getPreferences = async (req, res) => {
  try {
    const preferences = await Topic.find(
      {},
      {
        _id: 0,
        name: 1,
        description: 1,
      }
    );
    res
      .status(200)
      .json({ message: "Preferences fetched successfully", preferences });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
