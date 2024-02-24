const express = require("express");
const router = express.Router();

const { questionController } = require("../controllers/");
const { authenticate } = require("../middlewares");

router.post("/", questionController.addQuestion);
router.get("/", questionController.getQuestions);
router.post("/:id", questionController.getQuestion);
router.put("/:id", authenticate, questionController.updateQuestion);
router.delete("/:id", authenticate, questionController.deleteQuestion);
module.exports = router;
