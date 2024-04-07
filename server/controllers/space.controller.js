const sendResponse = require("../handlers/response.handler");
const Member = require("../models/Member");
const Space = require("../models/Space");
const User = require("../models/User");

// Get all spaces
exports.getSpaces = async (req, res) => {
  try {
    const spaces = await Space.find();
    sendResponse(res, 200, true, "Fetched spaces successfully", spaces);
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to fetch spaces");
  }
};

// Get a single space by ID
exports.getSpace = async (req, res) => {
  const { id } = req.params;
  try {
    const space = await Space.findById(id);
    if (!space) {
      return sendResponse(res, 404, false, "Space not found");
    }
    sendResponse(res, 200, true, "Space fetched successfully", space);
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to fetch space");
  }
};

// Create a new space
exports.createSpace = async (req, res) => {
  const { name, description, rules } = req.body;
  const createdBy = req.user._id;
  try {
    const space = new Space({ name, description, rules, createdBy });
    const newSpace = await space.save();
    sendResponse(res, 201, true, "Space created successfully", newSpace);
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to create space");
  }
};

// Update a space by ID
exports.updateSpace = async (req, res) => {
  const { id } = req.params;
  const { name, description, rules } = req.body;
  try {
    const updatedSpace = await Space.findByIdAndUpdate(
      id,
      { name, description, rules },
      { new: true }
    );
    if (!updatedSpace) {
      return sendResponse(res, 404, false, "Space not found");
    }
    sendResponse(res, 200, true, "Space updated successfully", updatedSpace);
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to update space");
  }
};

// Delete a space by ID
exports.deleteSpace = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  try {
    const deletedSpace = await Space.findOneAndDelete({
      _id: id,
      createdBy: userId,
    });
    if (!deletedSpace) {
      return sendResponse(res, 404, false, "Space not found");
    }
    sendResponse(res, 200, true, "Space deleted successfully");
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to delete space");
  }
};

// Add a member to a space
exports.addMember = async (req, res) => {
  const { id } = req.params; // Space ID
  const { userId, role } = req.body; // User ID and role
  const { _id: creatorId } = req.user;
  try {
    const space = await Space.findById(id);
    const user = await User.findById(userId);

    if (!space) {
      return sendResponse(res, 404, false, "Space not found");
    }

    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    // Check if the current user is the creator/admin of the space
    if (String(space.createdBy) !== String(creatorId)) {
      return sendResponse(
        res,
        403,
        false,
        "You are not authorized to add members to this space"
      );
    }

    // Check if the user to be added already exists in the space
    const existingMember = await Member.findOne({ userId, spaceId: id });
    if (existingMember) {
      return sendResponse(
        res,
        400,
        false,
        "User is already a member of this space"
      );
    }

    // Create a new member entry with the specified role
    const member = new Member({ userId, spaceId: id, role });
    await member.save();

    sendResponse(res, 200, true, "Member added successfully to the space");
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to add member to the space");
  }
};

// remove member from a space
exports.removeMember = async (req, res) => {
  const { id } = req.params; // Space ID
  const { userId } = req.body; // User ID and role
  const { _id: creatorId } = req.user;
  try {
    const space = await Space.findById(id);
    const user = await User.findById(userId);

    if (!space) {
      return sendResponse(res, 404, false, "Space not found");
    }

    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    // Check if the current user is the creator/admin of the space
    if (String(space.createdBy) !== String(creatorId)) {
      return sendResponse(
        res,
        403,
        false,
        "You are not authorized to remove members from this space"
      );
    }

    // Check if the user to be removed exists in the space
    const existingMember = await Member.findOne({ userId, spaceId: id });
    if (!existingMember) {
      return sendResponse(
        res,
        400,
        false,
        "User is not a member of this space"
      );
    }

    // remove member from space
    await existingMember.remove();

    sendResponse(res, 200, true, "Member removed successfully from the space");
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to remove member from the space");
  }
};

// Get all members of a space
exports.getMembers = async (req, res) => {
  const { id } = req.params;
  try {
    const members = await Member.find({ spaceId: id }).populate("userId");
    sendResponse(res, 200, true, "Fetched members successfully", members);
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to fetch members");
  }
};

// Get all spaces of a user
exports.getUserSpaces = async (req, res) => {
  const { id } = req.params;
  try {
    const spaces = await Space.find({ createdBy: id });
    sendResponse(res, 200, true, "Fetched user spaces successfully", spaces);
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to fetch user spaces");
  }
};

// get all spaces of a member
exports.getMemberSpaces = async (req, res) => {
  const { id } = req.params;
  try {
    const spaces = await Member.find({ userId: id }).populate("spaceId");
    sendResponse(res, 200, true, "Fetched member spaces successfully", spaces);
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, false, "Failed to fetch member spaces");
  }
};