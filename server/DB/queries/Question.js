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

exports.getQuestionWithAuthor = (questionId, userId) => {
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
      $lookup: {
        from: "topics",
        localField: "topicIds",
        foreignField: "_id",
        as: "topics",
      },
    },
    {
      $lookup: {
        from: "votes",
        let: {
          user_id: userId,
          entity_id: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$$user_id", "$userId"],
                  },
                  {
                    $eq: ["$$entity_id", "$entityId"],
                  },
                ],
              },
            },
          },
        ],
        as: "voteDetails",
      },
    },
    {
      $unwind: {
        path: "$voteDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        isUpvoted: {
          $eq: ["$voteDetails.voteType", "upvote"],
        },
        isDownvoted: {
          $eq: ["$voteDetails.voteType", "downvote"],
        },
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
        userId: 1,
        topics: 1,
      },
    },
  ]);
};

exports.getUserFeed = (
  condition,
  userId,
  count = true,
  sortObj = { createdAt: -1 },
  page,
  limit
) => {
  const pipeline = [
    {
      $match: condition,
    },
    {
      $lookup: {
        from: "topics",
        localField: "topicIds",
        foreignField: "_id",
        as: "topicIds",
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
      $sort: {
        createdAt: -1,
      },
    },
    {
      $lookup: {
        from: "votes",
        let: {
          user_id: userId,
          entity_id: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$$user_id", "$userId"],
                  },
                  {
                    $eq: ["$$entity_id", "$entityId"],
                  },
                ],
              },
            },
          },
        ],
        as: "voteDetails",
      },
    },
    {
      $unwind: {
        path: "$voteDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        isUpvoted: {
          $eq: ["$voteDetails.voteType", "upvote"],
        },
        isDownvoted: {
          $eq: ["$voteDetails.voteType", "downvote"],
        },
      },
    },
    {
      $project: {
        title: 1,
        content: 1,
        topicName: "$topicIds.name",
        upVotes: 1,
        downVotes: 1,
        views: 1,
        askedByUserName: "$userDetails.name",
        askedByUserId: "$userDetails._id",
        askedByUserProfile: "$userDetails.profilePic",
        voteDetails: "$voteDetails",
        isUpvoted: 1,
        isDownvoted: 1,
      },
    },
  ];
  if (count) {
    pipeline.push({
      $count: "totalRecords",
    });
  } else {
    pipeline.push(
      {
        $sort: sortObj,
      },
      {
        $limit: page * limit,
      }
    );
  }
  return Question.aggregate(pipeline);
};

exports.searchQuestion = (condition, count = false, page, limit) => {
  console.log("Condition", condition);
  const pipeline = [
    {
      $match: condition,
    },
  ];

  if (count) {
    pipeline.push({
      $count: "totalRecords",
    });
  } else {
    pipeline.push(
      {
        $sort: {
          createdAt: -1,
        },
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
