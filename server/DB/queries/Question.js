const Question = require("../../models/Question");

exports.getQuestionsByCondition = (
  condition,
  projection = { _id: 0 },
  count = false,
  sortObj,
  page,
  limit
) => {
  const pipeline = [
    {
      $match: condition,
    },
    {
      $project: { _id: 0, ...projection },
    },
  ];
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
  console.dir({ pipeline }, { depth: null });
  return Question.aggregate(pipeline);
};
