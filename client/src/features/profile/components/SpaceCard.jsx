import React from "react";
import { Card, CardText } from "react-bootstrap";

const SpaceCard = ({ space }) => {
  return (
    <Card>
      <CardText>
        <span className="fw-bold">{space.name}</span>
        <br />
        {space.description.slice(0, 100)}...
        <br />
        <span className="text-muted">
          {space.members} members · {space.posts} posts
        </span>
      </CardText>
    </Card>
  );
};

export default SpaceCard;
