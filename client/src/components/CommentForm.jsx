import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const CommentForm = ({ onSubmit }) => {
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(content);
        setContent("");
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <Form.Group controlId="commentContent">
                        <Form.Control
                            as="textarea"
                            rows={1}
                            placeholder="Write a comment..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col xs="auto">
                    <Button variant="primary" type="submit" block>
                        Add Comment
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default CommentForm;
