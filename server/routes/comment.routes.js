const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const { authenticate } = require("../middlewares/");

router.post("/:id", authenticate, commentController.addComment);
router.get("/:id", authenticate, commentController.getComments);
router.delete("/:id", authenticate, commentController.deleteComment);

module.exports = router;
