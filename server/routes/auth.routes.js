const express = require("express");
const router = express.Router();

const { authController } = require("../controllers/");
const { authenticate } = require("../middlewares");

router.post("/get-otp", authController.getVerificationOTP);
router.post("/verify-otp", authController.verifyOTP);
router.post("/get-user", authenticate, authController.checkAuth);
module.exports = router;
