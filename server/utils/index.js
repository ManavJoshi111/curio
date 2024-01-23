const jwt = require("jsonwebtoken");
const generateOTP = (otp_length) => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const generateToken = async (_id) => {
  const token = await jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

const verifyToken = async (token) => {
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

module.exports = { generateOTP, generateToken, verifyToken };
