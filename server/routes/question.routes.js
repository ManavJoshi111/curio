const express = require("express");
const router = express.Router();

const { questionController } = require("../controllers/");
const { authenticate } = require("../middlewares");

router.post("/", authenticate, questionController.addQuestion);
router.get("/", questionController.getQuestions);
router.get("/titles", authenticate, questionController.getQuestionTitlesByUser);
router.get("/:id", questionController.getQuestion);
router.post("/by-topic", authenticate, questionController.getQuestionByTopics);
router.put("/:id", authenticate, questionController.updateQuestion);
router.delete("/:id", authenticate, questionController.deleteQuestion);

module.exports = router;
