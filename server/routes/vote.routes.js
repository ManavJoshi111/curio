const express = require("express");
const router = express.Router();

const { authenticate } = require("../middlewares/");
const { voteController } = require("../controllers");

router.get("/upvote/:id", authenticate, voteController.toggleUpvote);
router.get("/downvote/:id", authenticate, voteController.toggleDownvote);
router.get("/voters/:id", authenticate, voteController.getVoters);

module.exports = router;
