const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./constants");
const mongoose = require("mongoose");

const generateOTP = (otp_length) => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const generateToken = async (_id) => {
  const token = await jwt.sign({ _id }, JWT_SECRET, {
    expiresIn: "7d",
  });
  console.log("generated token: ", token);
  return token;
};

const verifyToken = async (token) => {
  const decoded = await jwt.verify(token, JWT_SECRET);
  return decoded;
};

const generateObjectId = (id) => {
  return new mongoose.Types.ObjectId(id);
};

module.exports = { generateOTP, generateToken, verifyToken, generateObjectId };
