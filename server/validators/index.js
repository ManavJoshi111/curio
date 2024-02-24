const authValidator = require("./auth.validator");
const userValidator = require("./user.validator");
const { questionValidator } = require("./question.validator");
const { answerValidator } = require("./answer.validator");
module.exports = {
  authValidator,
  userValidator,
  questionValidator,
  answerValidator
};
