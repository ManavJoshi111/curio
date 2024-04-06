const express = require("express");
const router = express.Router();

const { answerController } = require("../controllers");
const { authenticate } = require("../middlewares");

router.post("/", authenticate, answerController.addAnswer);
router.get("/", authenticate, answerController.getAnswers);
router.get(
  "/by-question/:id",
  authenticate,
  answerController.getAnswerByQuestion
);
router.get("/:id", answerController.getAnswer);
router.put("/:id", authenticate, answerController.updateAnswer);
router.delete("/:id", authenticate, answerController.deleteAnswer);

module.exports = router;
