const User = require("../../models/User");

exports.getUserByCondition = (condition, projection = {}) => {
  const pipeline = [
    {
      $match: condition,
    },
  ];
  if (Object.keys(projection).length) {
    pipeline.push({
      $project: projection,
    });
  }
  return User.aggregate(pipeline);
};
