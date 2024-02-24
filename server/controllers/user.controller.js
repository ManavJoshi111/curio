const User = require("../models/User");
const { userValidator } = require("../validators/");

exports.uploadAdditionalDetails = async (req, res) => {
  try {
    const { error } = userValidator.additionalDetailsValidator.validate(
      req.body
    );
    if (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
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
    res.status(200).send({ message: "Details uploaded successfully" });
  } catch (err) {
    console.log("Err: ", err);
    res.status(500).send({ error: "Internal server error" });
  }
};
