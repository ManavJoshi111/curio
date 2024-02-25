import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { SERVER_URL } from "../../../utils/constants";
import { ErrorToast, SuccessToast } from "../../../utils/CustomToast";
import { get, post } from "../../../utils/axios";
import ImageUpload from "../../../components/ImageUpload";

const OnboardUser = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [userTopics, setUserTopics] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState({
    bio: "",
    contactNo: "",
    profilePic: "",
    topics: [],
  });

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

  const handleFormSubmit = async () => {
    console.log("Submitting form data:", additionalDetails);
    try {
      const response = await post(
        `${SERVER_URL}/api/user/additional-details`,
        additionalDetails
      );
      console.log("Data: ", response);
      SuccessToast(response.message);
      navigate("/");
    } catch (err) {
      console.log("Err: ", err);
      ErrorToast(err.error);
    }
  };

  // Fetch topics asynchronously on component mount
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await get(`${SERVER_URL}/api/topics`);
        const topics = response?.data;
        setUserTopics(
          topics.map((topic) => ({
            value: topic.topicId,
            label: topic.topicName,
          }))
        );
      } catch (error) {
        console.error("Error fetching topics:", error);
        ErrorToast("An error occurred, please try again after sometime");
      }
    };
    fetchTopics();
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          {page === 1 && <Welcome nextPage={handleNextClick} />}
          {page === 2 && (
            <UserAdditionalDetails
              setAdditionalDetails={setAdditionalDetails}
              additionalDetails={additionalDetails}
              prevPage={handlePrevClick}
              nextPage={handleNextClick}
            />
          )}
          {page === 3 && (
            <UserTopics
              setAdditionalDetails={setAdditionalDetails}
              additionalDetails={additionalDetails}
              prevPage={handlePrevClick}
              onSubmit={handleFormSubmit}
              userTopics={userTopics}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

const Welcome = ({ nextPage }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <Card className="text-center mb-5 border-0 shadow-lg" id="welcome">
      <Card.Body>
        <Card.Title className="fs-1">
          🤩Welcome {user.name.split(" ")[0]}🤩
        </Card.Title>
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
  setAdditionalDetails,
  additionalDetails,
  prevPage,
  nextPage,
}) => {
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "profilePic") {
      // handle file input
    } else {
      setAdditionalDetails({ ...additionalDetails, [id]: value });
    }
  };

  return (
    <>
      <Card
        className="text-center mb-5 border-0 p-2 shadow-lg"
        id="additional-details"
      >
        <Card.Title className="fs-1">Just a few more details!</Card.Title>
        <Card.Text className="lead" as="div">
          <Form>
            <Form.Group
              controlId="profilePic"
              className="d-flex justify-content-start flex-column mb-3"
            >
              <Form.Label className="text-start">Upload your image</Form.Label>
              {/* preview of image if profilePic is not null */}
              {additionalDetails?.profilePic && (
                <img
                  src={additionalDetails?.profilePic}
                  alt="img"
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                ></img>
              )}
              <ImageUpload setAdditionalDetails={setAdditionalDetails} />
            </Form.Group>
            <Form.Group
              controlId="bio"
              className="d-flex justify-content-start flex-column mb-3"
            >
              <Form.Label className="text-start">
                Tell us something about yourself!
              </Form.Label>
              <Form.Control
                as="textarea"
                onChange={handleInputChange}
                value={additionalDetails.bio}
              />
            </Form.Group>
            <Form.Group
              controlId="contactNo"
              className="d-flex justify-content-start flex-column mb-3"
            >
              <Form.Label className="text-start">
                Enter your mobile number
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Mobile Number"
                onChange={handleInputChange}
                value={additionalDetails.contactNo}
              />
            </Form.Group>
          </Form>
        </Card.Text>
      </Card>
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

const UserTopics = ({
  setAdditionalDetails,
  additionalDetails,
  prevPage,
  onSubmit,
  userTopics,
}) => {
  return (
    <Card className="text-center mb-5 border-0 shadow-lg" id="user-topics">
      <Card.Body>
        <Card.Title className="fs-1">What interests you?</Card.Title>
        <Form className="m-0 p-2">
          {userTopics.length > 0 ? (
            <Select
              options={userTopics}
              value={additionalDetails.topics.map((topic) => ({
                value: topic.topicId,
                label: topic.topicName,
              }))}
              onChange={(selectedOptions) => {
                setAdditionalDetails({
                  ...additionalDetails,
                  topics: selectedOptions.map((topic) => {
                    return {
                      topicId: topic.value,
                      topicName: topic.label,
                    };
                  }),
                });
              }}
              isMulti
            />
          ) : (
            <p>Loading topics...</p>
          )}
        </Form>
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
