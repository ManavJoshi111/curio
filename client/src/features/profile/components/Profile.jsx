import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  Tab,
  Tabs,
  Modal,
  Form,
} from "react-bootstrap";
import UserQuestions from "./UserQuestions";
import ImageUpload from "../../../components/ImageUpload";
import Select from "react-select";
import { getTopics } from "../../onboarding/actions/topicActions";
import Loading from "../../../components/Loading";
import { ErrorToast, SuccessToast } from "../../../utils/CustomToast";
import { get, put } from "../../../utils/axios";
import { SERVER_URL } from "../../../utils/constants";
import UserAnswers from "../../answers/components/UserAnswers";

const EditProfile = ({ showModal, setShowModal, user }) => {
  const { loading, error, topics } = useSelector((state) => state.topics);
  const dispatch = useDispatch();
  const handleInputChange = () => {};
  const [userData, setUserData] = useState({
    name: user.name,
    bio: user.bio,
    email: user.email,
    contactNo: user.contactNo,
    profilePic: user.profilePic,
    topics: user.topics.map((topic) => ({
      topicId: topic.topicId,
      topicName: topic.topicName,
    })),
  });

  useEffect(() => {
    if (!topics.length) {
      dispatch(getTopics());
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await put(
        `${SERVER_URL}/api/user/update-profile`,
        userData
      );
      if (response.success) {
        SuccessToast(response.message);
        window.location.reload();
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return ErrorToast(error.msg);
  }

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="xl"
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
            setShowModal(false);
          }}
        >
          <Row className="justify-content-center mb-3 align-items-center">
            <Col xs={3} className="text-center">
              <div className="d-flex justify-content-center align-items-center flex-column">
                <Image
                  className="rounded-circle border shadow mb-2"
                  src={userData.profilePic}
                  alt={userData.name}
                  width="150"
                  height="150"
                />
                <ImageUpload setData={setUserData} />
              </div>
            </Col>
          </Row>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="bio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              value={userData.bio}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="interests">
            <Form.Label>Interests</Form.Label>
            <Select
              options={topics.map((topic) => ({
                value: topic.topicId,
                label: topic.topicName,
              }))}
              value={userData.topics.map((topic) => ({
                value: topic.topicId,
                label: topic.topicName,
              }))}
              onChange={(selectedOptions) => {
                setUserData({
                  ...userData,
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
          </Form.Group>
          <Button variant="primary" className="mt-3" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const Profile = () => {
  let [user, setUser] = useState(); // state to set the user whose profie is being rendered
  let [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();
  let {
    loading: userLoading,
    error,
    user: currentUser,
  } = useSelector((state) => state.user); // loggedin user

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const response = await get(`${SERVER_URL}/api/auth/get-user/${id}`);
          setUser(response.data);
        } catch (err) {
          console.log("Error: ", err);
        }
      })();
    } else {
      setLoading(userLoading);
      setUser(currentUser);
    }
  }, []);

  if (loading || !user) {
    return <Loading />;
  }
  if (error) {
    return ErrorToast(error.msg);
  }

  return (
    <>
      <Container>
        <Row className="justify-content-center mb-3 align-items-center">
          <Col xs={3} className="text-center">
            <Image
              className="rounded-circle border shadow"
              src={user.profilePic}
              alt={user.name}
              width="150"
              height="150"
            />
          </Col>
          <Col xs={9}>
            <h1 className="display-4 mb-0">{user.name}</h1>
            <p className="lead mb-1">{user.bio}</p>
            {!id && (
              <Button
                className="btn-sm mb-1"
                variant="primary"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Edit Profile
              </Button>
            )}
            <ListGroup>
              <ListGroupItem>
                <span className="fw-bold">Contact:</span> {user.email}
              </ListGroupItem>
              <ListGroupItem>
                <span className="fw-bold">Interests: </span>
                {user.topics.map((topic) => (
                  <span
                    key={topic.topicId}
                    className="badge rounded-pill bg-primary me-1"
                  >
                    {topic.topicName}
                  </span>
                ))}
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>

        <h2 className="text-center">Activity</h2>
        <Tabs>
          <Tab eventKey="questions" title="Questions">
            <UserQuestions userId={id} />
          </Tab>
          <Tab eventKey="answers" title="Answers">
            <UserAnswers userId={id} />
          </Tab>
          {/* <Tab eventKey="following" title="Following">
            <Users />
          </Tab> */}
          {/* <Tab eventKey="followers" title="Followers">
            <UserCard key={user.id} user={user} />
          </Tab> */}
          {/* <Tab eventKey="spaces" title="Spaces">
            {spaces.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
          </Tab> */}
        </Tabs>
      </Container>
      {showModal && (
        <EditProfile
          showModal={showModal}
          setShowModal={setShowModal}
          user={user}
        />
      )}
    </>
  );
};

export default Profile;
