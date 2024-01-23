const Joi = require("joi");

exports.SignupValidator = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(10).required(),
  otp: Joi.any(),
});

exports.LoginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(10).required(),
});
