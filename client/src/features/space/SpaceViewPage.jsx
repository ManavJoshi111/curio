import React from "react";
import { Container, Row, Col, Image, Nav, Tab, ListGroup } from "react-bootstrap";

const SpacePage = () => {
  // Sample data for questions, answers, contributors, and space details
  const questions = [
    { id: 1, content: "Sample question 1" },
    { id: 2, content: "Sample question 2" },
    { id: 3, content: "Sample question 3" },
  ];

  const answers = [
    { id: 1, content: "Sample answer 1" },
    { id: 2, content: "Sample answer 2" },
    { id: 3, content: "Sample answer 3" },
  ];

  const contributors = [
    { id: 1, name: "Contributor 1" },
    { id: 2, name: "Contributor 2" },
    { id: 3, name: "Contributor 3" },
  ];

  const spaceDetails = {
    name: "Space Name",
    description: "Description of the space",
    image: "https://via.placeholder.com/150", // Sample image URL
  };

  return (
    <Container>
      {/* Space Header */}
      <Row className="mt-4">
        <Col>
          <h2>{spaceDetails.name}</h2>
          <p>{spaceDetails.description}</p>
        </Col>
        <Col className="text-center">
          <Image src={spaceDetails.image} roundedCircle />
        </Col>
      </Row>

      {/* Tab Navigation */}
      <Row className="mt-4">
        <Col>
          <Tab.Container defaultActiveKey="questions">
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="questions">Questions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="answers">Answers</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="contributors">Contributors</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="mt-3">
              {/* Questions Tab */}
              <Tab.Pane eventKey="questions">
                <h4>Questions</h4>
                <ListGroup>
                  {questions.map((question) => (
                    <ListGroup.Item key={question.id}>{question.content}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab.Pane>

              {/* Answers Tab */}
              <Tab.Pane eventKey="answers">
                <h4>Answers</h4>
                <ListGroup>
                  {answers.map((answer) => (
                    <ListGroup.Item key={answer.id}>{answer.content}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab.Pane>

              {/* Contributors Tab */}
              <Tab.Pane eventKey="contributors">
                <h4>Contributors</h4>
                <ListGroup>
                  {contributors.map((contributor) => (
                    <ListGroup.Item key={contributor.id}>{contributor.name}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default SpacePage;
