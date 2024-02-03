import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Loading from "../utils/Loading";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { SuccessToast, ErrorToast } from "../utils/CustomToast";
import { post } from "../utils/axios";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { email, password } = formData;
  const { user } = useSelector((state) => state.user);
  if (user) {
    return <Navigate to="/" />;
  }

  const handleLogin = async () => {
    try {
      setLoading(true);
      const data = await post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      setLoading(false);
      alert(data.message);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setLoading(false);
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
            <Button className="mb-4 w-100" size="md" onClick={handleLogin}>
              {loading ? <Loading /> : "Login"}
            </Button>
          </>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
