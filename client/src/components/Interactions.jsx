import React from "react";
import { SERVER_URL } from "../utils/constants";

const Interactions = ({ entityId, isUpvoted = false, isDownvoted = false }) => {
  const handleUpvote = () => {};

  const handleDownvote = () => {};

  return (
    <div className="container-fluid interactions d-flex justify-content-start gap-1 mt-2 fs-4">
      <div
        className={
          "border border-secondary rounded upvote " +
          (isUpvoted ? "active-upvote" : "")
        }
        onClick={handleUpvote}
      >
        👍
      </div>
      <div
        className={
          "border border-secondary rounded downvote " +
          (isDownvoted ? "active-downvote" : "")
        }
        onclick={handleDownvote}
      >
        👎
      </div>
      <div className="border border-secondary rounded">
        <i class="far fa-comment p-1"></i>
      </div>
    </div>
  );
};

export default Interactions;
