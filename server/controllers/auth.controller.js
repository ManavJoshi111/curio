const ejs = require("ejs");
const { promises: fs } = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const sendResponse = require("../handlers/response.handler");
const {
  authValidator: { SignupValidator, LoginValidator },
} = require("../validators");
const {
  generateOTP,
  generateToken,
  verifyToken,
  generateObjectId,
} = require("../utils");
const { sendEmail } = require("../services");
const {
  getUserByCondition,
  updateUserByCondition,
} = require("../DB/queries/Auth");

exports.getVerificationOTP = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { error, value } = SignupValidator.validate(req.body);
    if (error) {
      console.error("Validation Error: ", error);
      return sendResponse(res, 400, false, error.details[0].message);
    }

    let user = await getUserByCondition({ email });
    user = user.length && user[0];
    if (user) {
      if (!user.isVerified) {
        const userOtp = generateOTP(6);
        user.otp = userOtp;
        user = new User({
          name,
          email,
          password,
          otp: userOtp,
        });
        await user.save();

        const data = { name, otp: userOtp };

        const file = await fs.readFile(
          // To run the project locally without any errors, just remove '/server from the below line
          path.join(__dirname, "../services/email-template.ejs"),
          "utf-8"
        );
        const renderedTemplate = ejs.render(file, data);
        console.log("Sending email");
        await sendEmail(
          email,
          "Verify Your Email Address - Curio",
          null,
          renderedTemplate
        );

        return sendResponse(
          res,
          200,
          true,
          "A verification code has been sent to you via email, please enter to continue creating your account!"
        );
      } else {
        return sendResponse(res, 400, false, "User already exists!");
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
    await user.save();
    const data = { name, otp: userOtp };
    const file = await fs.readFile(
      // To run the project locally without any errors, just remove '/server from the below line
      path.join(__dirname, "../services/email-template.ejs"),
      "utf-8"
    );
    const renderedTemplate = ejs.render(file, data);
    console.log("Sending email");
    await sendEmail(
      email,
      "Verify Your Email Address - Curio",
      null,
      renderedTemplate
    );
    return sendResponse(
      res,
      200,
      true,
      "A verification code has been sent to you via email, please enter to continue creating your account!"
    );
  } catch (error) {
    console.error("Error in getVerificationOTP: ", error);
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

exports.verifyOTP = async (req, res) => {
  const { name, email, password, otp } = req.body;
  const { error } = SignupValidator.validate(req.body);
  if (error) {
    console.log("error in verifyOTP: ", error);
    return sendResponse(res, 400, false, error.details[0].message);
  }
  let userFound = await getUserByCondition({ email, otp });
  userFound = userFound.length && userFound[0];
  if (userFound) {
    userFound.otp = null;
    userFound.isVerified = true;
    const token = await generateToken(userFound._id);
    console.log("Userfound: ", userFound);
    await updateUserByCondition({ _id: userFound._id, email }, userFound);
    return sendResponse(
      res,
      200,
      true,
      "Account verified successfully!",
      token
    );
  } else {
    return sendResponse(
      res,
      400,
      false,
      "Invalid OTP or email, please try again!"
    );
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error, value } = LoginValidator.validate(req.body);
    if (error) {
      console.error("Validation Error: ", error);
      return sendResponse(res, 400, false, error.details[0].message);
    }
    let user = await getUserByCondition({ email });
    user = user.length && user[0];
    if (!user) {
      return sendResponse(
        res,
        400,
        false,
        "Invalid credentials or you don't have any account!"
      );
    }
    if (!user.isVerified) {
      return sendResponse(res, 400, false, "Your account is not verified!");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(
        res,
        400,
        false,
        "Invalid credentials or you don't have any account!"
      );
    }
    const token = await generateToken(user._id);
    return sendResponse(res, 200, true, "Logged in successfully!", token);
  } catch (error) {
    console.error("Error in login: ", error);
    return sendResponse(
      res,
      500,
      false,
      "Internal Server Error, please try again after some time!"
    );
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id
      ? generateObjectId(req.params.id)
      : req.user._id;
    let user = await getUserByCondition({ _id: userId }, { password: 0 });
    user = user.length && user[0];
    return sendResponse(res, 200, true, "User fetched successfully!", user);
  } catch (err) {
    console.error("Error in getUser: ", err);
    return sendResponse(
      res,
      500,
      false,
      "Internal Server Error, please try again after some time!"
    );
  }
};
