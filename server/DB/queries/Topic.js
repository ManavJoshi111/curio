const Topic = require("../../models/Topic");

exports.getTopicsByCondition = (condition, projection = {}) =>
  Topic.aggregate([{ $match: condition }, { $project: projection }]);
