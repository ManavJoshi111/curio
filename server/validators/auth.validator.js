const Joi = require("joi");

exports.userLoginValidator = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().email().required(),
  otp: Joi.any(),
});
