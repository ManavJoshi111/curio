import React from "react";
import { Card, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { formatDate } from "../utils/FormatDate";

const Comment = ({ commentData }) => {
  return (
    <Card className="mt-2">
      <Card.Body className="comment-body d-flex p-0">
        <div className="comment-profile p-1 d-flex justify-content-start align-items-center">
          {commentData?.userId?.profilePic ? (
            <Image
              src={commentData?.userId?.profilePic}
              alt="profile-pic"
              className="rounded-circle border shadow mb-2 comment-profile-pic"
              // alt={userData.name}
              width="45"
              height="45"
            />
          ) : (
            <i className="far fa-user-circle fw-bold fs-3 comment-profile-icon"></i>
          )}
        </div>
        <div className="comment-content ms-1 p-1">
          <NavLink
            className="comment-username fw-bold text-decoration-none"
            to={`/profile/${commentData?.userId?._id}`}
          >
            {commentData?.userId?.name}
          </NavLink>
          <span className="fs-6">
            &nbsp; ({formatDate(commentData.createdAt)})
          </span>
          <p className="comment-text mb-0">{commentData.content}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Comment;
