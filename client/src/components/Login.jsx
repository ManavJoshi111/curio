import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // check if the user is logged in or not and set the state accordingly
  const handleGetOtp = () => {
    // Add logic to request OTP (e.g., through an API call)
    setShowOtp(true);
  };

  const handleSignIn = () => {
    // Add logic to handle sign-in
    console.log("Sign in logic");
  };

  return (
    <Container fluid className="my-2">
      <p className="h1 text-center p-3 text-decoration-underline">Login</p>
      <Row>
        <Col col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone image"
          />
        </Col>
        <Col col="4" md="6">
          <>
            <Form.Group className="mb-2 fw-bold">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                className="border border-2"
                size="sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={showOtp}
              />
            </Form.Group>
            <Form.Group className=" mb-2 fw-bold">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                className="border border-2"
                size="sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={showOtp}
              />
            </Form.Group>
            <p className={(showOtp ? "d-none " : "") + `mb-1`}>
              Don't have an account?
              <Link to="/register">Register</Link>
            </p>
            <Button
              className={(showOtp ? "d-none " : "") + `mb-4 w-100`}
              size="md"
              onClick={handleGetOtp}
            >
              Get OTP
            </Button>
          </>
          {showOtp && (
            <>
              <p className="mb-3 fw-bold">Enter OTP</p>
              <Row>
                {[1, 2, 3, 4, 5, 6].map((digit) => (
                  <Col key={digit} xs="auto" className="mb-2">
                    <Form.Control
                      type="text"
                      className="text-center border border-2"
                      maxLength="1"
                      size="sm"
                      style={{ width: "2rem" }}
                    />
                  </Col>
                ))}
              </Row>
              <p className="mb-1">
                Resend OTP
                {/* Add logic to resend OTP */}
              </p>
              <Button className="mb-4 w-100" size="md" onClick={handleSignIn}>
                Sign in
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
