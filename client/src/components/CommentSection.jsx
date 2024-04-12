import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { get, post } from "../utils/axios";
import ButtonLoader from "../utils/ButtonLoader"

const CommentSection = ({ entityId, entityType }) => {
  const [comments, setComments] = useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    fetchComments(entityId);
  }, [entityId]);

  const fetchComments = async (entityId) => {
    try {
      setLoading(true);
      const response = await get(`/api/comments/${entityId}`);
      "Resp: ", response.data;
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    }
    finally{
      setLoading(false);
    }
  };

  const handleReply = async (replyContent) => {
    try {
      setLoading(true);
      const response = await post(`/api/comments/${entityId}`, {
        entityType,
        content: replyContent,
      });
      await fetchComments(entityId);
    } catch (error) {
      console.error("Error replying to comment:", error);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="mt-1">
        <Col>
          <CommentForm onSubmit={(content) => handleReply(content)} />
          {
            loading ? <ButtonLoader/> : (
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  onReply={(replyContent) => handleReply(comment.id, replyContent)}
                  commentData={comment}
                />
              ))
            )
          }
          
        </Col>
      </Row>
    </Container>
  );
};

export default CommentSection;
