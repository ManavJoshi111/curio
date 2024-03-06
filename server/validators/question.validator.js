const Joi = require("joi");

exports.questionValidator = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  content: Joi.string().min(10).max(8000).required(),
  topicIds: Joi.any(),
});
