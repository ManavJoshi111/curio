/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import CreateSpaceModal from "./components/CreateSpaceModal";
import { Link } from "react-router-dom";
import "../../styles/space.css";

// TODO : update to a better UI and break down into smaller components
const SpacePage = () => {
  const [userSpaces, setUserSpaces] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [discoverSpaces, setDiscoverSpaces] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const fetchUserSpaces = async () => {
    const userSpacesData = [
      {
        _id: 1,
        name: "Technology",
        description: "Discuss all things related to technology and innovation.",
      },
      {
        _id: 2,
        name: "Health & Wellness",
        description: "Share tips and advice on leading a healthy lifestyle.",
      },
    ];

    // TODO: Fetch user spaces from the server

    setUserSpaces(userSpacesData);
  };

  const fetchPendingRequests = async () => {
    const pendingRequestsData = [
      { _id: 1, name: "Space 1" },
      { _id: 2, name: "Space 2" },
    ];

    // TODO: Fetch pending requests from the server

    setPendingRequests(pendingRequestsData);
  };

  const fetchDiscoverSpaces = async () => {
    const discoverSpacesData = [
      { _id: 1, name: "Space 3" },
      { _id: 2, name: "Space 4" },
    ];

    //TODO: Fetch discover spaces from the server

    setDiscoverSpaces(discoverSpacesData);
  };

  const handleCreateSpace = (spaceData) => {
    console.log("Creating space:", spaceData);
    if (showCreateModal) toggleCreateModal(); // Close the modal after creating the space

    // TODO: Send the space data to the server to create a new space

    const newSpace = {
      _id: userSpaces.length + 1,
      ...spaceData,
    };

    setUserSpaces([...userSpaces, newSpace]);
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
              <ListGroup.Item
                as={Link}
                to={`/space/${space._id}`}
                key={space._id}
                className="space-list-item"
              >
                {space.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <h2 className="mt-4">Pending Requests</h2>
          <ListGroup>
            {pendingRequests.map((request) => (
              <ListGroup.Item
                as={Link}
                to={`/space/${request._id}`}
                key={request._id}
                className="space-list-item"
              >
                {request.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="mt-4">Discover Spaces</h2>
          <ListGroup>
            {discoverSpaces.map((space) => (
              <ListGroup.Item
                as={Link}
                to={`/space/${space._id}`}
                key={space._id}
                className="space-list-item"
              >
                {space.name}
              </ListGroup.Item>
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
