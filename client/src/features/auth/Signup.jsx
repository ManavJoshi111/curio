import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { NavLink, Navigate } from "react-router-dom";
import Loading from "../../utils/ButtonLoader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SuccessToast, ErrorToast } from "../../utils/CustomToast";
import { getUserData } from "./actions/userActions";
import { post } from "../../utils/axios";
import { SERVER_URL } from "../../utils/constants";

const Signup = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { name, email, password } = formData;

  if (user) return <Navigate to="/" />;
  const handleGetOtp = async () => {
    setLoading(true);
    try {
      const response = await post(`${SERVER_URL}/api/auth/get-otp`, {
        name,
        email,
        password,
      });
      setLoading(false);
      setShowOtp(true);
      SuccessToast(response.message);
    } catch (err) {
      setLoading(false);
      ErrorToast(err.message);
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const response = await post(`${SERVER_URL}/api/auth/verify-otp`, {
        name,
        email,
        password,
        otp,
      });
      setLoading(false);
      SuccessToast(response.message);
      localStorage.setItem("token", response.data);
      dispatch(getUserData());
      navigate("/");
      setShowOtp(false);
    } catch (err) {
      ErrorToast(err.message);
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
    <Container fluid className="m-0 p-0">
      <Row className="d-flex flex-row-reverse">
        <Col
          col="10"
          md="6"
          className="d-flex align-items-center justify-content-center vh-100 m-0 p-0"
        >
          <img
            src="/assets/User-Entry.svg"
            style={{
              marginLeft: "235px",
              zIndex: "-100",
              width: "100%",
              height: "100%",
            }}
            className="img-fluid"
            alt="Phone image"
          />
        </Col>
        <Col
          col="4"
          md="6"
          className="d-flex align-items-center justify-content-center shadow-lg"
        >
          <div className="w-100">
            <p className="h1 text-center">Signup</p>
            <>
              <Form>
                <Form.Group className="pt-2 mb-2 fw-bold d-flex w-100 justify-content-center align-items-center">
                  <div className="d-flex justify-content-start align-items-start flex-column w-50">
                    <Form.Label className="mb-1">Name</Form.Label>
                    <Form.Control
                      type="text"
                      className="border border-2 rounded-4"
                      size="sm"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                      disabled={showOtp}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="pt-2 mb-2 fw-bold d-flex w-100 justify-content-center align-items-center">
                  <div className="d-flex justify-content-start align-items-start flex-column w-50">
                    <Form.Label className="mb-1">Email</Form.Label>
                    <Form.Control
                      type="email"
                      className="border border-2 rounded-4"
                      size="sm"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                      disabled={showOtp}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="pt-2 mb-2 fw-bold d-flex w-100 justify-content-center align-items-center">
                  <div className="d-flex justify-content-start align-items-start flex-column w-50">
                    <Form.Label className="mb-1">Password</Form.Label>
                    <Form.Control
                      type="password"
                      className="border border-2 rounded-4"
                      size="sm"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                    />
                  </div>
                </Form.Group>
                {showOtp && (
                  <>
                    <Form.Group className="pt-2 mb-2 fw-bold d-flex w-100 justify-content-center align-items-center">
                      <div className="d-flex justify-content-start align-items-start flex-column w-50">
                        <Form.Label>Enter Code: </Form.Label>
                        <Form.Control
                          type="number"
                          className="border border-2 rounded-4"
                          size="sm"
                          name="otp"
                          onChange={handleOtpChange}
                        />
                      </div>
                    </Form.Group>
                    <div className="d-flex justify-content-start align-items-center flex-column mt-4">
                      <Button
                        className="mb-2 w-50"
                        size="md"
                        onClick={handleSignIn}
                      >
                        Sign in
                      </Button>
                    </div>
                  </>
                )}
                {!showOtp && (
                  <div className="d-flex justify-content-start align-items-center flex-column mt-4">
                    <p className="text-start m-0 p-1 ps-0">
                      Already Have an Account? &nbsp;
                      <NavLink to="/login">Login</NavLink>
                    </p>
                    <Button
                      className={(showOtp ? "d-none " : "") + `mb-2 w-50`}
                      size="md"
                      onClick={handleGetOtp}
                    >
                      {loading ? <Loading /> : "Get verification code"}
                    </Button>
                  </div>
                )}
              </Form>
            </>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
