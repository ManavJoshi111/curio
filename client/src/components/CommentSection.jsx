import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { get, post } from "../utils/axios";

const CommentSection = ({ entityId, entityType }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments(entityId);
  }, [entityId]);

  const fetchComments = async (entityId) => {
    try {
      const response = await get(`/api/comments/${entityId}`);
      "Resp: ", response.data;
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    }
  };

  const handleReply = async (replyContent) => {
    try {
      const response = await post(`/api/comments/${entityId}`, {
        entityType,
        content: replyContent,
      });
      await fetchComments(entityId);
    } catch (error) {
      console.error("Error replying to comment:", error);
    }
  };

  return (
    <Container>
      <Row className="mt-1">
        <Col>
          <CommentForm onSubmit={(content) => handleReply(content)} />
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              onReply={(replyContent) => handleReply(comment.id, replyContent)}
              commentData={comment}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CommentSection;
