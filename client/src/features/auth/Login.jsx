import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ButtonLoader from "../../utils/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { SuccessToast, ErrorToast } from "../../utils/CustomToast";
import { post } from "../../utils/axios";
import { NavLink } from "react-router-dom";
import { getUserData } from "./actions/userActions";
import { SERVER_URL } from "../../utils/constants";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password } = formData;
  const { user } = useSelector((state) => state.user);
  if (user) return <Navigate to="/" />;

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await post(`${SERVER_URL}/api/auth/login`, {
        email,
        password,
      });
      setLoading(false);
      localStorage.setItem("token", response.data);
      dispatch(getUserData());
      SuccessToast(response.message);
      navigate("/");
    } catch (err) {
      setLoading(false);
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
    <Container fluid>
      <Row>
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
            <p className="h1 text-center p-3">Login</p>
            <>
              <Form.Group className="pt-2 mb-2 fw-bold d-flex w-100 justify-content-center align-items-center">
                <div className="d-flex justify-content-start align-items-start flex-column w-50">
                  <Form.Label className="mb-1 text-start">Email</Form.Label>
                  <Form.Control
                    type="email"
                    className="border border-2 rounded-4 "
                    size="sm"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
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
              <div className="d-flex justify-content-start align-items-center flex-column mt-4">
                <p className="text-start m-0 p-1 ps-0">
                  Dont' Have an Account? &nbsp;
                  <NavLink to="/signup">Create Account</NavLink>
                </p>
                <Button className="mb-4 w-50" onClick={handleLogin}>
                  {loading ? <ButtonLoader /> : "Login"}
                </Button>
              </div>
            </>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
