const Joi = require("joi");

exports.answerValidator = Joi.object({
  questionId: Joi.string().required(),
  content: Joi.string().min(10).max(8000).required()
});
