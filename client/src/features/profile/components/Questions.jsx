import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardText } from "react-bootstrap";
import { get } from "../../../utils/axios";
import { SERVER_URL } from "../../../utils/constants";
import { formatDate } from "../../../utils/FormatDate";

const Questions = () => {
  const [titles, setTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestionTitles = async () => {
      setIsLoading(true);
      try {
        const res = await get(`${SERVER_URL}/api/questions/titles`);
        setTitles(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestionTitles();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>; // Display a user-friendly error message
  }

  return (
    <>
      <div className="question-list">
        {titles.map(({ _id, title, createdAt }) => (
          <Card
            key={title}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/question/${_id}`)}
          >
            <CardBody>
              <CardText className="question-title">
                <span className="fw-bold">{title}</span>
              </CardText>
              <CardText className="question-metadata">
                <div className="text-muted">{formatDate(createdAt)}</div>
              </CardText>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Questions;
