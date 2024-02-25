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
import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";
import UserCard from "./UserCard";
import SpaceCard from "./SpaceCard";

const Profile = () => {
  // Pass user data as prop
  const { user } = useSelector((state) => state.user);
  console.log("User: ", user);
  const questions = [
    {
      id: 1,
      title: "What is the best way to learn React?",
      body: "I'm a beginner...",
      createdAt: new Date(2024, 1, 25),
      upvotes: 15,
      downvotes: 2,
      author: {
        id: 1,
        username: "johndoe",
        avatar: "https://example.com/avatar.jpg",
      },
      space: { id: 1, name: "React Dev" },
    },
  ];

  const answers = [
    {
      id: 1,
      body: "There are many great ways to learn React...",
      createdAt: new Date(2024, 1, 26),
      upvotes: 10,
      downvotes: 1,
      author: {
        id: 2,
        username: "janedoe",
        avatar: "https://example.com/user2.jpg",
      },
      question: { id: 1, title: "What is the best way to learn React?" },
    },
    // Add more sample answers
  ];

  const followedUsers = [
    {
      id: 2,
      username: "janedoe",
      avatar: "https://example.com/user2.jpg",
      bio: "Another aspiring developer",
    },
    // Add more users
  ];

  const followers = [
    {
      id: 3,
      username: "alice",
      avatar: "https://example.com/user3.jpg",
      bio: "Enthusiastic learner",
    },
    // Add more users
  ];

  const spaces = [
    {
      id: 1,
      name: "React Dev",
      description: "A space for React discussions",
      members: 120,
      posts: 50,
    },
    // Add more spaces
  ];

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
      <Row className="justify-content-evenly mb-3">
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
      </Row>

      {/* Activity with React Bootstrap Tabs */}
      <h2 className="text-center">Activity</h2>
      <Tabs>
        <Tab eventKey="questions" title="Questions">
          {/* Dynamically render question cards here */}
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </Tab>
        <Tab eventKey="answers" title="Answers">
          {/* Dynamically render answer cards here */}
          {answers.map((answer) => (
            <AnswerCard key={answer.id} answer={answer} />
          ))}
        </Tab>
        <Tab eventKey="following" title="Following">
          {/* Dynamically render user cards for followed users */}
          {followedUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Tab>
        <Tab eventKey="followers" title="Followers">
          {/* Dynamically render user cards for followers */}
          {followers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Tab>
        <Tab eventKey="spaces" title="Spaces">
          {/* Dynamically render space cards here */}
          {spaces.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </Tab>
      </Tabs>
    </Container>
  );
};

// Define components for Question
export default Profile;
