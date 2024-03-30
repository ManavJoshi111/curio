const express = require("express");
const router = express.Router();

const { authenticate } = require("../middlewares");
const { userController } = require("../controllers/");

router.post(
  "/additional-details",
  authenticate,
  userController.uploadAdditionalDetails
);

router.put("/update-profile", authenticate, userController.updateProfile);

module.exports = router;
