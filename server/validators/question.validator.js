const Joi = require("joi");

exports.questionValidator = Joi.object({
  content: Joi.string().min(10).max(8000).required()
});
