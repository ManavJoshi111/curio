import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../utils/Loading";
import { useNavigate } from "react-router-dom";
import { SuccessToast, ErrorToast } from "../utils/CustomToast";
import { post } from "../utils/axios";

const Signup = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();
  const { name, email } = formData;
  const handleGetOtp = async () => {
    setLoading(true);
    try {
      const data = await post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/get-otp`,
        {
          name,
          email,
        }
      );
      setLoading(false);
      setShowOtp(true);
      alert(data.message);
    } catch (err) {
      setLoading(false);
      alert(err.error);
      console.log("caught: ", err);
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };
  const handleSignIn = async () => {
    try {
      setLoading(true);
      const data = await post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/verify-otp`,
        {
          name,
          email,
          otp,
        }
      );
      setLoading(false);
      alert(data.message);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      alert(err.error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Container fluid className="my-2">
      <p className="h1 text-center p-3 text-decoration-underline">Signup</p>
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
                name="name"
                value={name}
                onChange={handleInputChange}
                disabled={showOtp}
              />
            </Form.Group>
            <Form.Group className=" mb-2 fw-bold">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                className="border border-2"
                size="sm"
                name="email"
                value={email}
                onChange={handleInputChange}
                disabled={showOtp}
              />
            </Form.Group>
            <p className={(showOtp ? "d-none " : "") + `mb-1`}>
              Already have an account? &nbsp;
              <Link to="/login">Login</Link>
            </p>
            <Button
              className={(showOtp ? "d-none " : "") + `mb-4 w-100`}
              size="md"
              onClick={handleGetOtp}
            >
              {loading ? <Loading /> : "Get verification code"}
            </Button>
          </>
          {showOtp && (
            <>
              <Form.Group className=" mb-2 fw-bold">
                <Form.Label>Enter Code: </Form.Label>
                <Form.Control
                  type="number"
                  className="border border-2"
                  size="sm"
                  name="otp"
                  onChange={handleOtpChange}
                />
              </Form.Group>
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

export default Signup;
