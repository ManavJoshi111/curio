import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { ToastContainer } from "react-bootstrap";

const SuccessToast = ({ title, body }) => {
  const [show, setShow] = useState(true);
  const toggleShow = () => setShow(!show);

  return (
    <Row>
      <Col md={6} className="mb-2">
        <ToastContainer position="bottom-end" className="mb-2 me-2">
          <Toast
            show={show}
            onClose={toggleShow}
            delay={3000}
            autohide
            text="white"
          >
            <Toast.Header closeButton={false}>
              <span role="img" aria-label="success-emoji" className="me-2">
                ✅
              </span>
              <strong className="me-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body>{body}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
};

const ErrorToast = ({ title, body }) => {
  const [show, setShow] = useState(true);
  const toggleShow = () => setShow(!show);

  return (
    <Row>
      <Col md={6} className="mb-2">
        <ToastContainer position="top-center" className="mb-2 me-2">
          <Toast
            show={show}
            onClose={toggleShow}
            delay={3000}
            bg="danger"
            autohide
            text="white"
          >
            <Toast.Header closeButton={false}>
              <span role="img" aria-label="error-emoji" className="me-2">
                ❌
              </span>
              <strong className="me-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body>{body}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
};

export { SuccessToast, ErrorToast };
