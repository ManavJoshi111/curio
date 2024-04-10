import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../utils/constants";
import { get } from "../utils/axios";
import { SuccessToast, ErrorToast } from "../utils/CustomToast";
import CommentSection from "./CommentSection";

const Interactions = ({ entityId, isUpvoted = false, isDownvoted = false }) => {
  const [upvoted, setUpvoted] = useState(isUpvoted);
  const [downvoted, setDownvoted] = useState(isDownvoted);
  const [showCommentSection, setShowCommentSection] = useState(false);

  const handleUpvote = async () => {
    try {
      const response = await get(`${SERVER_URL}/api/vote/upvote/${entityId}`);
      setUpvoted(response.data.upvoted);
      setDownvoted(false);
    } catch (err) {
      ErrorToast("Oops! There's an error, please try again after sometime!");
    }
  };

  const handleDownvote = async () => {
    try {
      const response = await get(`${SERVER_URL}/api/vote/downvote/${entityId}`);
      setDownvoted(response.data.downvoted);
      setUpvoted(false);
    } catch (err) {
      ErrorToast(err.error);
    }
  };

  return (
    <>
      <div className="container-fluid interactions d-flex justify-content-end gap-2 mt-2 fs-4 p-2">
        <div
          className={
            "border border-secondary rounded upvote fs-3 " +
            (upvoted ? "active-upvote" : "")
          }
          onClick={handleUpvote}
        >
          👍
        </div>
        <div
          className={
            "border border-secondary rounded downvote fs-3 " +
            (downvoted ? "active-downvote" : "")
          }
          onClick={handleDownvote}
        >
          👎
        </div>
        <div
          className={
            "border border-secondary rounded fs-3 comment-section" +
            (showCommentSection ? " active-comment" : "")
          }
          onClick={() => setShowCommentSection(!showCommentSection)}
        >
          <i className="far fa-comment p-1"></i>
        </div>
      </div>
      {showCommentSection && <CommentSection entityId={entityId} />}
    </>
  );
};

export default Interactions;
