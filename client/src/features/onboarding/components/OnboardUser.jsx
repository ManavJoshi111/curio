import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { SERVER_URL } from "../../../utils/constants";
import { ErrorToast } from "../../../utils/CustomToast";
import { get } from "../../../utils/axios";

const OnboardUser = () => {
  const [page, setPage] = useState(1);
  const [userDetails, setUserDetails] = useState({});
  const [additionalDetails, setAdditionalDetails] = useState({});
  const [userPreferences, setUserPreferences] = useState([]);

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

  const handleFormSubmit = () => {
    const formData = {
      userDetails: userDetails,
      additionalDetails: additionalDetails,
      userPreferences: userPreferences.map((pref) => pref.value),
    };

    console.log("Submitting form data:", formData);
    // Example: navigate to another page after submission
    // navigate('/success');
  };

  // Fetch preferences asynchronously on component mount
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const { preferences } = await get(`${SERVER_URL}/api/preferences`);
        setUserPreferences(
          preferences.map((pref) => ({ value: pref.name, label: pref.name }))
        );
      } catch (error) {
        console.error("Error fetching preferences:", error);
        ErrorToast("An error occurred, please try again after sometime");
      }
    };
    fetchPreferences();
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          {page === 1 && <Welcome nextPage={handleNextClick} />}
          {page === 2 && (
            <UserAdditionalDetails
              userDetails={userDetails}
              onUserDetailsChange={setUserDetails}
              additionalDetails={additionalDetails}
              onAdditionalDetailsChange={setAdditionalDetails}
              prevPage={handlePrevClick}
              nextPage={handleNextClick}
            />
          )}
          {page === 3 && (
            <UserPreferences
              additionalDetails={additionalDetails}
              userPreferences={userPreferences}
              onUserPreferencesChange={setUserPreferences}
              prevPage={handlePrevClick}
              onSubmit={handleFormSubmit}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

const Welcome = ({ nextPage }) => {
  return (
    <Card className="text-center mb-5 border-0 shadow-lg" id="welcome">
      <Card.Body>
        <Card.Title className="fs-1">Welcome!</Card.Title>
        <Card.Text className="lead">
          Thank you for choosing our platform.
        </Card.Text>
        <Button variant="primary" onClick={nextPage}>
          Next
        </Button>
      </Card.Body>
    </Card>
  );
};

const UserAdditionalDetails = ({
  userDetails,
  onUserDetailsChange,
  additionalDetails,
  onAdditionalDetailsChange,
  prevPage,
  nextPage,
}) => {
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "profilePic") {
      onUserDetailsChange({ ...userDetails, [id]: value }); // Update userDetails for file input
    } else {
      onAdditionalDetailsChange({ ...additionalDetails, [id]: value }); // Update additionalDetails for other inputs
    }
  };

  return (
    <>
      <Card.Title className="display-6">Just a few more details!</Card.Title>
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
      <div className="d-flex justify-content-between mt-3">
        <Button variant="secondary" onClick={prevPage}>
          Prev
        </Button>
        <Button variant="primary" onClick={nextPage}>
          Next
        </Button>
      </div>
    </>
  );
};

const UserPreferences = ({
  additionalDetails,
  userPreferences,
  onUserPreferencesChange,
  prevPage,
  onSubmit,
}) => {
  return (
    <Card className="text-center mb-5 border-0 shadow-lg" id="user-preferences">
      <Card.Body>
        <Card.Title className="display-6">Preferences</Card.Title>
        <div className="container border border-dark p-0">
          <Form className="m-0 p-2">
            {userPreferences.length > 0 && (
              <Select
                options={userPreferences}
                // value={userPreferences}
                onChange={(selectedOptions) =>
                  onUserPreferencesChange(selectedOptions)
                }
                isMulti
              />
            )}
          </Form>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <Button variant="secondary" onClick={prevPage}>
            Prev
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OnboardUser;
