import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PREFERENCES as availablePreferences } from "../../../utils/constants";

const OnboardUser = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState({}); // Lifted state up

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

  const handleFormDataChange = (newData) => {
    console.log("newdata: ", newData);
    setUserData({ ...userData, ...newData });
  };

  const handleFormSubmit = () => {
    // Handle form submission logic
    // You can use userData to submit the form data
    console.log("Submitting form data:", userData);
    // Example: navigate to another page after submission
    // navigate('/success');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          {page === 1 && <Welcome user={user} />}
          {page === 2 && (
            <UserAdditionalDetails
              user={user}
              onChange={handleFormDataChange}
            />
          )}
          {page === 3 && (
            <UserPreferences
              availablePreferences={availablePreferences}
              onChange={handleFormDataChange}
            />
          )}

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
              onClick={handleFormSubmit}
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
        <Card.Title className="fs-1">
          Welcome {user.name.split(" ")[0]}🤩!
        </Card.Title>
        <Card.Text className="lead">
          Thank you for choosing our platform.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const UserAdditionalDetails = ({ user, onChange }) => {
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    onChange({ [id]: value });
  };

  return (
    <Card className="text-center mb-5 border-0 shadow-lg" id="user-details">
      <Card.Body>
        <Card.Title className="display-6">
          Just a few more details✨!
        </Card.Title>
        <Card.Text className="lead" as="div">
          <Form>
            <Form.Group
              controlId="profilePic"
              className="d-flex justify-content-start flex-column mb-3"
            >
              <Form.Label className="text-start">Upload your image</Form.Label>
              <Form.Control type="file" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group
              controlId="bio"
              className="d-flex justify-content-start flex-column mb-3"
            >
              <Form.Label className="text-start">
                Tell us something about yourself!
              </Form.Label>
              <Form.Control as="textarea" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group
              controlId="contactNo"
              className="d-flex justify-content-start flex-column mb-3"
            >
              <Form.Label className="text-start">
                Enter your mobile number
              </Form.Label>
              <Form.Control
                type="tel"
                placeholder="Mobile Number"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const UserPreferences = ({ availablePreferences }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePreferenceAdd = (preference) => {
    setSelectedPreferences([...selectedPreferences, preference]);
    setSearchQuery("");
    onChange({ preferences: selectedPreferences });
  };

  const handlePreferenceRemove = (preference) => {
    setSelectedPreferences(selectedPreferences.filter((p) => p !== preference));
    onChange({ preferences: selectedPreferences });
  };

  const filterPreferences = () => {
    return availablePreferences.filter(
      (p) =>
        p.toLowerCase().startsWith(searchQuery.toLowerCase()) &&
        !selectedPreferences.includes(p)
    );
  };

  return (
    <Card className="text-center mb-5 border-0 shadow-lg" id="user-preferences">
      <Card.Body>
        <Card.Title className="display-6">Preferences</Card.Title>
        <Form>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search preferences..."
              aria-label="Search preferences"
              aria-describedby="basic-addon2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </InputGroup>
          {filterPreferences().map((preference) => (
            <button
              className="btn me-2 btn-outline-dark btn-sm"
              key={preference}
              onClick={() => handlePreferenceAdd(preference)}
            >
              {preference}
            </button>
          ))}
          {selectedPreferences.length > 0 && (
            <div className="mt-3">
              <ul className="list-unstyled">
                {selectedPreferences.map((preference) => (
                  <Button
                    key={preference}
                    className="btn btn-sm ms-2"
                    onClick={() => handlePreferenceRemove(preference)}
                  >
                    {preference}
                    <i className="fas fa-times ml-2 ms-2" />
                  </Button>
                ))}
              </ul>
            </div>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default OnboardUser;
