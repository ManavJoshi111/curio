const joi = require("joi");

const commentValidator = joi.object({
  entityType: joi.string().valid("Question", "Answer").required(),
  content: joi.string().min(3).max(8000).required(),
});

module.exports = { commentValidator };
