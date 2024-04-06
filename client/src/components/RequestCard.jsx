// request card, which will show users to whom users can sent request for answering their questions, joining their spaces, etc.

import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const RequestModal = ({ show, handleClose, requestType, entityId }) => {
  const [users, setUsers] = useState([
    { _id: 1, name: "User 1" },
    { _id: 2, name: "User 2" },
  ]); // List of users to whom the request can be sent

  let title;
  switch (requestType) {
    case "answerQuestion":
      title = "Request to Answer Question";
      break;
    case "joinSpace":
      title = "Request to Join Space";
      break;
    // Add more cases for other request types as needed
    default:
      title = "Request";
  }

  const fetchUsers = () => {
    // TODO: Fetch users from the server
    // const users = await fetch(`/api/users`);
    // setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRequest = (_id) => {
    // TODO: Send request to the server
    // await fetch(`/api/request`, {
    //   method: "POST",
    //   body: JSON.stringify({ requestType, entityId, userId: _id }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display the list of users for the request with request button */}
        {users.map((user) => (
          <div
            key={user._id}
            className="d-flex justify-content-between align-items-center p-2 m-2 
            border border-dark rounded shadow-sm bg-light 
          "
          >
            <h4>{user.name}</h4>
            <Button onClick={() => handleRequest(user._id)}>
              Send Request
            </Button>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestModal;
