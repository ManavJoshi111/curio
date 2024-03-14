const express = require("express");
const router = express.Router();

const { questionController } = require("../controllers/");
const { authenticate } = require("../middlewares");

// Get question by different filters
router.get("/titles", authenticate, questionController.getQuestionTitlesByUser);
router.post("/by-topic", authenticate, questionController.getQuestionByTopics);

// Basic CRUD - Question
router.post("/", authenticate, questionController.addQuestion);
router.get("/:id", authenticate, questionController.getQuestion);
router.put("/:id", authenticate, questionController.updateQuestion);
router.delete("/:id", authenticate, questionController.deleteQuestion);
router.get("/", questionController.getQuestions);

module.exports = router;
