const Follower = require("../models/Follower");
const Space = require("../models/Space");
const Topic = require("../models/Topic");
const sendResponse = require("../handlers/response.handler");

// Toggle follow status for a space or topic
exports.toggleFollow = async (req, res) => {
  const { id, type } = req.params;
  const userId = req.user._id;
  try {
    // Check if the entity type is valid
    if (type !== "space" && type !== "topic") {
      return sendResponse(
        res,
        400,
        false,
        "Invalid entity type. Must be 'space' or 'topic'"
      );
    }

    // Check if the entity exists
    let entity;
    if (type === "space") {
      entity = await Space.findById(id);
    } else {
      entity = await Topic.findById(id);
    }

    if (!entity) {
      return sendResponse(
        res,
        404,
        false,
        `The ${type} with ID ${id} does not exist`
      );
    }

    // Check if the user is currently following the space or topic
    const existingFollower = await Follower.findOne({
      userId,
      entityId: id,
      entityType: type,
    });
    if (existingFollower) {
      // If already following, unfollow
      await existingFollower.remove();

      // Decrease totalFollowers count from space
      await Space.findByIdAndUpdate(id, { $inc: { totalFollowers: -1 } });

      return sendResponse(
        res,
        200,
        true,
        `You have unfollowed this ${entity.name}`
      );
    } else {
      // If not following, follow
      const follower = new Follower({ userId, entityId: id, entityType: type });
      await follower.save();

      // Increase totalFollowers count from space
      await Space.findByIdAndUpdate(id, { $inc: { totalFollowers: 1 } });

      return sendResponse(
        res,
        200,
        true,
        `You are now following this ${entity.name}`
      );
    }
  } catch (err) {
    console.error(err);
    sendResponse(
      res,
      500,
      false,
      `Failed to toggle follow status of the ${type}`
    );
  }
};

// Get all followers of a space or topic
exports.getFollowers = async (req, res) => {
  const { id, type } = req.params;
  try {
    // Check if the entity type is valid
    if (type !== "space" && type !== "topic") {
      return sendResponse(
        res,
        400,
        false,
        "Invalid entity type. Must be 'space' or 'topic'"
      );
    }

    // Check if the entity exists
    let entity;
    if (type === "space") {
      entity = await Space.findById(id);
    } else {
      entity = await Topic.findById(id);
    }

    if (!entity) {
      return sendResponse(
        res,
        404,
        false,
        `The ${type} with ID ${id} does not exist`
      );
    }

    // Get all followers of the space or topic
    const followers = await Follower.find({
      entityId: entity._id,
      entityType: type,
    });

    return sendResponse(res, 200, true, "Fetched followers successfully", {
      followers,
      totalFollowers: followers.length,
    });
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to get followers");
  }
};




