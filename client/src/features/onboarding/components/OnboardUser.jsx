import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OnboardUser = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.location.hash = `#${getPageId(page)}`;
  }, [page]);

  const getPageId = (page) => {
    switch (page) {
      case 1:
        return "welcome";
      case 2:
        return "user-details";
      case 3:
        return "user-preferences";
      default:
        return "";
    }
  };

  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    if (page < 3) {
      setPage(page + 1);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          {page === 1 && <Welcome user={user} />}
          {page === 2 && <UserAdditionalDetails user={user} />}
          {page === 3 && <UserPreferences user={user} />}

          <div className="d-flex justify-content-between mt-3">
            <Button
              variant="secondary"
              disabled={page === 1}
              onClick={handlePrevClick}
            >
              Prev
            </Button>
            <Button
              variant="primary"
              className={page === 3 ? "d-none" : ""}
              disabled={page === 3}
              onClick={handleNextClick}
            >
              Next
            </Button>
            <Button
              variant="primary"
              className={page !== 3 ? "d-none" : ""}
              onClick={handleNextClick}
            >
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const Welcome = ({ user }) => {
  return (
    <Card className="text-center mb-5 border-0 shadow-lg" id="welcome">
      <Card.Body>
        <Card.Title className="display-4">
          Welcome {user.name.split(" ")[0]}🤩!
        </Card.Title>
        <Card.Text className="lead">
          Thank you for choosing our platform.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const UserAdditionalDetails = ({ user }) => {
  return (
    <Card className="text-center mb-5 border-0 shadow-lg" id="welcome">
      <Card.Body>
        <Card.Title className="display-6">
          Just a few more details✨!
        </Card.Title>
        <Card.Text className="lead" as="div">
          <Form>
            <Form.Group
              controlId="userProfile"
              className="d-flex justify-content-start flex-column mb-3"
            >
              <Form.Label className="text-start">Upload your image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group
              controlId="userBio"
              className="d-flex justify-content-start flex-column mb-3"
            >
              <Form.Label className="text-start">
                Tell us something about yourself!
              </Form.Label>
              <Form.Control as="textarea" />
            </Form.Group>
            <Form.Group
              controlId="userMobileNo"
              className="d-flex justify-content-start flex-column mb-3"
            >
              <Form.Label className="text-start">
                Enter your mobile number
              </Form.Label>
              <Form.Control type="tel" placeholder="Mobile Number" />
            </Form.Group>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const UserPreferences = () => {
  return (
    <>
      <h1>Preferences</h1>
    </>
  );
};

export default OnboardUser;
