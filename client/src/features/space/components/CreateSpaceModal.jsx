// now create a modal in which user can create space
// modal should open when user clicks on create space button
// and there should be button in the modal to close the modal

// -- modal should take this information from user

// ---- space name
// ---- space description
// ---- space rules

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ErrorToast } from "../../../utils/CustomToast";

const CreateSpaceModal = ({ visible, toggleModal, handleCreate }) => {

  const [spaceInfo, setSpaceInfo] = useState({
    spaceName: "",
    spaceDescription: "",
    spaceRules: "",
  });

  const handleCreateSpace = () => {
    // Validate input fields before creating space
    if (
      !spaceInfo.spaceName ||
      !spaceInfo.spaceDescription ||
      !spaceInfo.spaceRules
    ) {
      ErrorToast("Please fill in all fields");
      return;
    }

    // Call the handleCreate function passed from parent component
    handleCreate(spaceInfo);

    // Reset input fields
    setSpaceInfo({
      spaceName: "",
      spaceDescription: "",
      spaceRules: "",
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSpaceInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <Modal show={visible} onHide={toggleModal} >
      <Modal.Header closeButton>
        <Modal.Title>Create a Space</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="spaceName">
            <Form.Label>Space Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter space name"
              value={spaceInfo.spaceName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="spaceDescription">
            <Form.Label>Space Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter space description"
              value={spaceInfo.spaceDescription}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="spaceRules">
            <Form.Label>Space Rules</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter space rules"
              value={spaceInfo.spaceRules}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateSpace}>
          Create Space
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateSpaceModal;
