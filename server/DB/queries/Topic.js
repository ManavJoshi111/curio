const Topic = require("../../models/Topic");

exports.getTopicsByCondition = (condition, projection = {}) =>
  Topic.find(condition, projection);
