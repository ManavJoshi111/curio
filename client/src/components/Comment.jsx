import React from "react";
import { Card } from "react-bootstrap";

const Comment = ({ commentData }) => {
    return (
        <Card className="mt-3">
            <Card.Body className="comment-body d-flex">
                <div className="comment-profile p-1">
                    {commentData?.profilePic ? (
                        <img
                            src={commentData.profilePic}
                            alt="profile-pic"
                            className="rounded-circle comment-profile-pic"
                        />
                    ) : (
                        <i className="far fa-user-circle fw-bold fs-3 comment-profile-icon"></i>
                    )}
                </div>
                <div className="comment-content ms-1 p-1">
                    <p className="comment-username">{commentData.userName}</p>
                    <p className="comment-text">{commentData.content}</p>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Comment;
