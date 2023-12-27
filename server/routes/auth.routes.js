const express = require("express");
const router = express.Router();

const { authController } = require("../controllers/");

router.post("/get-otp", authController.getVerificationOTP);

module.exports = router;
