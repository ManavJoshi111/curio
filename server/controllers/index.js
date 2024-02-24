const authController = require("./auth.controller");
const topicsController = require("./topics.controller");
const userController = require("./user.controller");
const questionController =  require("./question.controller")
const answerController =  require("./answer.controller")

module.exports = {
  authController,
  questionController,
  topicsController,
  userController,
  answerController
}
