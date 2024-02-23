const express = require("express");
const router = express.Router();

const { topicsController } = require("../controllers");

router.get("/", topicsController.getTopics);

module.exports = router;
