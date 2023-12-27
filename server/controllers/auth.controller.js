const ejs = require("ejs");
const fs = require("fs");
const { User } = require("../models");
const { userLoginValidator } = require("../validators");
const { generateOTP } = require("../utils");
const { sendEmail } = require("../services");

exports.getVerificationOTP = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { error, value } = userLoginValidator.validate(req.body);
    if (error) {
      console.error("Validation Error: ", error);
      return res
        .status(400)
        .json({ success: false, error: "Invalid input data" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: "An account associated with this Email already exists!",
      });
    }

    const user = new User({ name, email });

    const userOtp = generateOTP(6);
    user.otp = userOtp;

    // Send an email to the user using nodemailer (add nodemailer logic here)
    const data = { name, otp: userOtp };
    const html = fs.readFileSync("./services/email-template.ejs", "utf-8");
    const renderedTemplate = ejs.render(html, data);
    await sendEmail(
      "manavjoshi154@gmail.com",
      "Verify Your Email Address - Curio",
      null,
      renderedTemplate
    );

    await user.save();
    return res.status(200).json({
      success: true,
      message:
        "A verification code has been sent to you via email, please enter to continue creating your account!",
    });
  } catch (error) {
    console.error("Error in getVerificationOTP: ", error);
    return res
      .status(500)
      .json({
        success: false,
        error: "Internal Server Error, please try again after some time!",
      });
  }
};
