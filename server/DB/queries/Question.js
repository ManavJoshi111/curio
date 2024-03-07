const Question = require("../../models/Question");

exports.getQuestionsByCondition = (
  condition,
  projection = {},
  count = false,
  sortObj,
  page,
  limit
) => {
  const pipeline = [
    {
      $match: condition,
    },
  ];
  if (Object.keys(projection).length > 0) {
    pipeline.push({
      $project: projection,
    });
  }
  if (count) {
    pipeline.push({
      $group: {
        _id: null,
        totalRecords: { $sum: 1 },
      },
    });
  } else {
    pipeline.push(
      {
        $sort: sortObj,
      },
      {
        $limit: page * limit,
      },
      {
        $skip: (page - 1) * limit,
      }
    );
  }
  return Question.aggregate(pipeline);
};
