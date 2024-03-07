import React from "react";
import { Card as BootstrapCard, CardText, CardBody } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/FormatDate";

const Card = ({ classes, title, createdAt, navigateLink }) => {
  const navigate = useNavigate();

  return (
    <BootstrapCard
      className={classes}
      style={{ cursor: "pointer" }}
      onClick={() => navigate(navigateLink)}
    >
      <CardBody>
        <CardText className="card-title">
          <span className="fw-bold">{title}</span>
        </CardText>
        <CardText className="card-metadata">
          <span className="text-muted">{formatDate(createdAt)}</span>
        </CardText>
      </CardBody>
    </BootstrapCard>
  );
};

export default Card;
