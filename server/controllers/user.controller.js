const sendResponse = require("../handlers/response.handler");
const User = require("../models/User");
const { userValidator } = require("../validators/");

exports.uploadAdditionalDetails = async (req, res) => {
  try {
    const { error } = userValidator.additionalDetailsValidator.validate(
      req.body
    );
    if (error) {
      return sendResponse(res, 400, false, error.details[0].message);
    }
    await User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          ...req.body,
          isOnboarded: true,
        },
      }
    );
    return sendResponse(
      res,
      200,
      true,
      "Additional details added successfully"
    );
  } catch (err) {
    console.log("Err: ", err);
    return sendResponse(res, 500, false, "Failed to add additional details");
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { error } = userValidator.profileValidator.validate(req.body);
    if (error) {
      return sendResponse(res, 400, false, error.details[0].message);
    }
    await User.updateOne(
      { _id: req.user._id },
      {
        $set: req.body,
      }
    );
    return sendResponse(
      res,
      200,
      true,
      "Additional details added successfully"
    );
  } catch (err) {
    console.log("Err: ", err);
    return sendResponse(res, 500, false, "Failed to add additional details");
  }
};
