const Question = require("../models/Question");
const Answer = require("../models/Answer");
const { generateObjectId } = require("../utils");

const checkModerator = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  let resource;
  console.log("Id: ", id);

  if (req.originalUrl.includes("questions")) {
    resource = await Question.findOne({ _id: generateObjectId(id) });
  } else if (req.originalUrl.includes("answers")) {
    resource = await Answer.findById({ _id: generateObjectId(id) });
  } else {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    if (!user.role || user.role !== "moderator") {
      if (!resource || resource.userId.toString() !== user._id.toString()) {
        return res.status(403).json({ message: "Forbidden" });
      }
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = checkModerator;
