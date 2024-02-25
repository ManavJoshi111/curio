import React from "react";
import { Card, CardText } from "react-bootstrap";

const QuestionCard = ({ question }) => {
  return (
    <Card>
      <CardText>
        <span className="fw-bold">{question.title}</span>
        <br />
        {question.body.slice(0, 100)}...
        <br />
        <span className="text-muted">
          by {question.author.username} in {question.space.name}
        </span>
      </CardText>
    </Card>
  );
};

export default QuestionCard;
