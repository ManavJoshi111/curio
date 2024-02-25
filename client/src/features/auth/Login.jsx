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
      console.log("Data: ", response);
      localStorage.setItem("token", response.data);
      dispatch(getUserData());
      SuccessToast(response.message);
      navigate("/");
    } catch (err) {
      setLoading(false);
      ErrorToast(err.error);
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
            <Form.Group className="pt-2 mb-2 fw-bold">
              <Form.Label className="mb-1">Email</Form.Label>
              <Form.Control
                type="email"
                className="border border-2"
                size="sm"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="pt-2 mb-2 fw-bold">
              <Form.Label className="mb-1">Password</Form.Label>
              <Form.Control
                type="password"
                className="border border-2"
                size="sm"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <p className="text-end m-0 p-1">
              Dont' Have an Account? &nbsp;
              <NavLink to="/signup">Create Account</NavLink>
            </p>
            <Button className="mb-4 w-100" size="md" onClick={handleLogin}>
              {loading ? <ButtonLoader /> : "Login"}
            </Button>
          </>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
