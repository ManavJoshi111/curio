const express = require("express");
const router = express.Router();

const { authenticate } = require("../middlewares");
const { userController } = require("../controllers/");

router.post(
  "/additional-details",
  authenticate,
  userController.uploadAdditionalDetails
);

module.exports = router;
