import React from "react";
import { Card, CardText } from "react-bootstrap";

const AnswerCard = ({ answer }) => {
  return (
    <Card>
      <CardText>
        {answer.body.slice(0, 100)}...
        <br />
        <span className="text-muted">
          by {answer.author.username} · {answer.createdAt.toLocaleDateString()}
        </span>
      </CardText>
    </Card>
  );
};

export default AnswerCard;
