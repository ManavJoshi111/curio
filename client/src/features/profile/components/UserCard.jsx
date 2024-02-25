import React from "react";
import { Card, CardImg, CardBody, CardText } from "react-bootstrap";

const UserCard = ({ user }) => {
  return (
    <Card>
      <CardImg src={user.avatar} alt={user.username} variant="top" />
      <CardBody>
        <CardText>
          <span className="fw-bold">{user.username}</span>
          <br />
          {user.bio}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default UserCard;
