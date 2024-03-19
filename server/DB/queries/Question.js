const Question = require("../../models/Question");
const { generateObjectId } = require("../../utils");

exports.getQuestionsByCondition = (
  condition,
  projection = {},
  count = true,
  sortObj = {},
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

exports.getQuestionWithAuthor = (questionId) => {
  return Question.aggregate([
    {
      $match: {
        _id: generateObjectId(questionId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: {
        path: "$userDetails",
      },
    },
    {
      $project: {
        title: 1,
        content: 1,
        upVotes: 1,
        downVotes: 1,
        views: 1,
        createdAt: 1,
        updatedAt: 1,
        userName: "$userDetails.name",
        useEmail: "$userDetails.email",
      },
    },
  ]);
};
