const Joi = require("joi");

exports.additionalDetailsValidator = Joi.object({
  profilePic: Joi.string().required(),
  bio: Joi.string().min(10).max(255).required().required(),
  contactNo: Joi.number().required(),
  preferences: Joi.array().required(),
});
