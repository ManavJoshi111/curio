const { userLoginValidator } = require("../validators");
exports.getVerificationOTP = async (req, res) => {
  const { name, email } = req.body;
  const { error, value } = userLoginValidator.validate(req.body);
  if (error) {
    console.log("Error: ", error);
    return res.status(400).json({ success: false, error });
  }
  // write OTP login based on jwt and email of the user

  return res.status(200).json({
    success: true,
    message:
      "A verification code has been sent to you via email, please enter to continue creating your account!",
  });
};
