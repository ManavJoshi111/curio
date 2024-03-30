/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import CreateSpaceModal from "./components/CreateSpaceModal";

// TODO : update to a better UI and break down into smaller components
const SpacePage = () => {
  const [userSpaces, setUserSpaces] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [discoverSpaces, setDiscoverSpaces] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  }

  const fetchUserSpaces = async () => {
    const userSpacesData = [
      {
        id: 1,
        name: "Technology",
        description: "Discuss all things related to technology and innovation.",
      },
      {
        id: 2,
        name: "Health & Wellness",
        description: "Share tips and advice on leading a healthy lifestyle.",
      },
    ];
    setUserSpaces(userSpacesData);
  };

  const fetchPendingRequests = async () => {
    const pendingRequestsData = [
      { id: 1, name: "Space 1" },
      { id: 2, name: "Space 2" },
    ];
    setPendingRequests(pendingRequestsData);
  };

  const fetchDiscoverSpaces = async () => {
    const discoverSpacesData = [
      { id: 1, name: "Space 3" },
      { id: 2, name: "Space 4" },
    ];
    setDiscoverSpaces(discoverSpacesData);
  };

  const   handleCreateSpace = (spaceData) => {
    // You can handle space creation logic here or pass it to the parent component
    console.log("Creating space:", spaceData);
    if(showCreateModal) toggleCreateModal(); // Close the modal after creating the space
  };

  useEffect(() => {
    fetchUserSpaces();
    fetchPendingRequests();
    fetchDiscoverSpaces();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Row className="align-items-center">
            <Col>
              <h2 className="mt-4">Your Spaces</h2>
            </Col>
            <Col className="text-right">
              <Button
                className="mt-2"
                variant="primary"
                onClick={toggleCreateModal}
              >
                Create a Space
              </Button>
            </Col>
          </Row>
          <ListGroup>
            {userSpaces.map((space) => (
              <ListGroup.Item key={space.id}>{space.name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <h2 className="mt-4">Pending Requests</h2>
          <ListGroup>
            {pendingRequests.map((request) => (
              <ListGroup.Item key={request.id}>{request.name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="mt-4">Discover Spaces</h2>
          <ListGroup>
            {discoverSpaces.map((space) => (
              <ListGroup.Item key={space.id}>{space.name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <CreateSpaceModal
        visible={showCreateModal}
        toggleModal={toggleCreateModal}
        handleCreate={handleCreateSpace}
      />
    </Container>
  );
};

export default SpacePage;