const express = require("express");
const router = express.Router();

const { preferencesController } = require("../controllers/");

router.get("/", preferencesController.getPreferences);

module.exports = router;
