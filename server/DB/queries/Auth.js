const User = require("../../models/User");

exports.getUserByCondition = (condition, projection = {}) =>
  User.find(condition, projection);
