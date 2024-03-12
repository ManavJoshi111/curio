import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  CardText,
  ListGroup,
  ListGroupItem,
  Button,
  Tab,
  Tabs,
} from "react-bootstrap";
import Questions from "./Questions";

const Profile = () => {
  // Pass user data as prop
  const { user } = useSelector((state) => state.user);

  return (
    <Container>
      {/* Upper Section with User Information */}
      <Row className="justify-content-center mb-3 align-items-center">
        <Col xs={3} className="text-center">
          {/* Large, circular profile picture */}
          <Image
            className="rounded-circle border shadow"
            src={user.profilePic}
            alt={user.name}
            width="150"
            height="150"
          />
        </Col>
        <Col xs={9}>
          {/* Username and bio */}
          <h1 className="display-4 mb-0">{user.name}</h1>
          <p className="lead mb-1">{user.bio}</p>

          <Button className="btn-sm mb-1" variant="primary">
            Edit Profile
          </Button>
          {/* Additional user information */}
          <ListGroup>
            <ListGroupItem>
              <span className="fw-bold">Contact:</span> {user.email}
            </ListGroupItem>
            <ListGroupItem>
              <span className="fw-bold">Interests: </span>
              {user.topics.map((topic) => (
                <span
                  key={topic._id}
                  className="badge rounded-pill bg-primary me-1"
                >
                  {topic.topicName}
                </span>
              ))}
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>

      {/* Statistics */}
      {/* <Row className="justify-content-evenly mb-3">
        <Col>
          <Card className="text-center">
            <CardText>Questions</CardText>
            <CardText>{questions.length}</CardText>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <CardText>Answers</CardText>
            <CardText>{answers.length}</CardText>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <CardText>Spaces</CardText>
            <CardText>{spaces.length}</CardText>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <CardText>Followers</CardText>
            <CardText>{followers.length}</CardText>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <CardText>Following</CardText>
            <CardText>{followedUsers.length}</CardText>
          </Card>
        </Col>
      </Row> */}

      {/* Activity with React Bootstrap Tabs */}
      <h2 className="text-center">Activity</h2>
      <Tabs>
        <Tab eventKey="questions" title="QUESTIONS">
          {/* Dynamically render question cards here */}
          <Questions />
        </Tab>
        <Tab eventKey="answers" title="ANSWERS">
          {/* <Answers /> */}
        </Tab>
        {/* <Tab eventKey="following" title="Following">
          <Users />
        </Tab>
        <Tab eventKey="followers" title="Followers">
          <UserCard key={user.id} user={user} />
        </Tab>
        <Tab eventKey="spaces" title="Spaces">
          {spaces.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </Tab> */}
      </Tabs>
    </Container>
  );
};

export default Profile;
