import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const CommentSection = ({ entityId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments from the server using the entityId
    fetchComments(entityId)
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [entityId]);

  const fetchComments = async (entityId) => {
    // Replace this with your actual API endpoint to fetch comments
    const response = await fetch(`/api/comments?entityId=${entityId}`);
    const data = await response.json();
    return data;
  };

  const handleReply = async (parentId, replyContent) => {
    try {
      // Send the reply to the server
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentId,
          content: replyContent,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to send reply");
      }
      // Fetch the updated comments from the server
      const updatedComments = await fetchComments(entityId);
      setComments(updatedComments);
    } catch (error) {
      console.error("Error replying to comment:", error);
    }
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h4>Comments</h4>
          <CommentForm onSubmit={(content) => handleReply(0, content)} />
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
