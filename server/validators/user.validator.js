const Joi = require("joi");

exports.additionalDetailsValidator = Joi.object({
  profilePic: Joi.string().required(),
  bio: Joi.string().min(10).max(255).required().required(),
  contactNo: Joi.number().required(),
  topics: Joi.array().required(),
});

exports.profileValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  profilePic: Joi.string().required(),
  bio: Joi.string().min(10).max(255).required().required(),
  contactNo: Joi.number().required(),
  topics: Joi.array().required(),
});
