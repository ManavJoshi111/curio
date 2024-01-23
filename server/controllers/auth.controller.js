const ejs = require("ejs");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const {
  authValidator: { SignupValidator, LoginValidator },
} = require("../validators");
const { generateOTP, generateToken, verifyToken } = require("../utils");
const { sendEmail } = require("../services");

exports.getVerificationOTP = async (req, res) => {
  try {
    console.log("getverfication otp: ", req.body);
    const { name, email, password } = req.body;
    const { error, value } = SignupValidator.validate(req.body);
    if (error) {
      console.error("Validation Error: ", error);
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }

    let user = await User.findOne({ email });
    console.log("found user: ", user);
    if (user) {
      if (!user.verified) {
        const userOtp = generateOTP(6);
        user.otp = userOtp;
        await user.save();

        const data = { name, otp: userOtp };
        const html = fs.readFileSync("./services/email-template.ejs", "utf-8");
        const renderedTemplate = ejs.render(html, data);
        console.log("Sending email");
        await sendEmail(
          email,
          "Verify Your Email Address - Curio",
          null,
          renderedTemplate
        );

        return res.status(200).json({
          success: true,
          message:
            "A verification code has been sent to you via email, please enter to continue creating your account!",
        });
      } else {
        return res.status(400).json({
          success: false,
          error: "User already exists and is verified!",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userOtp = generateOTP(6);
    user = new User({
      name,
      email,
      password: hashedPassword,
      otp: userOtp,
    });
    console.log("new user is: ", user);
    await user.save();
    const data = { name, otp: userOtp };
    const html = fs.readFileSync("./services/email-template.ejs", "utf-8");
    const renderedTemplate = ejs.render(html, data);
    console.log("Sending email");
    await sendEmail(
      email,
      "Verify Your Email Address - Curio",
      null,
      renderedTemplate
    );
    return res.status(200).json({
      success: true,
      message:
        "A verification code has been sent to you via email, please enter to continue creating your account!",
    });
  } catch (error) {
    console.error("Error in getVerificationOTP: ", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error, please try again after some time!",
    });
  }
};

exports.verifyOTP = async (req, res) => {
  const { name, email, password, otp } = req.body;
  const { error, value } = SignupValidator.validate(req.body);
  if (error) {
    console.log("error in verifyOTP: ", error);
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }
  const userFound = await User.findOne({ email, otp });
  if (userFound) {
    userFound.otp = null;
    userFound.verified = true;
    const token = await generateToken(userFound._id);
    await userFound.save();
    return res
      .status(200)
      .json({ success: true, message: "Account verified successfully", token });
  } else {
    return res
      .status(400)
      .json({ success: false, error: "Incorrect OTP or user doesn't exists!" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("req.body", req.body);
    const { error, value } = LoginValidator.validate(req.body);
    if (error) {
      console.error("Validation Error: ", error);
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
    const user = await User.findOne({ email });
    console.log("user: ", user);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "User doesn't exists!" });
    }
    if (!user.verified) {
      return res
        .status(400)
        .json({ success: false, error: "User is not verified!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials!" });
    }
    const token = await generateToken(user._id);
    return res
      .status(200)
      .json({ success: true, message: "Logged in successfully!", token });
  } catch (error) {
    console.error("Error in login: ", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error, please try again after some time!",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).select("-password");
    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Error in getUser: ", err);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error, please try again after some time!",
    });
  }
};
