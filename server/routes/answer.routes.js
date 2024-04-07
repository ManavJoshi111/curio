const express = require("express");
const router = express.Router();

const { answerController } = require("../controllers");
const { authenticate } = require("../middlewares");

// get answers based on additional filters
router.get(
  "/by-question/:id",
  authenticate,
  answerController.getAnswerByQuestion
);
router.get("/by-user/:id?", authenticate, answerController.getUserAnswers);

// basic CRUD on answers
router.post("/", authenticate, answerController.addAnswer);
router.get("/", authenticate, answerController.getAnswers);
router.get("/:id", answerController.getAnswer);
router.put("/:id", authenticate, answerController.updateAnswer);
router.delete("/:id", authenticate, answerController.deleteAnswer);

module.exports = router;
