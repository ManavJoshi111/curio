import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardText } from "react-bootstrap";
import { formatDate } from "../../../utils/FormatDate"; // Assuming this function exists
import { get } from "../../../utils/axios";
import { SERVER_URL } from "../../../utils/constants";
import RichText from "../../../components/RichText";
import { ErrorToast } from "../../../utils/CustomToast";

const Question = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState();

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const res = await get(`${SERVER_URL}/api/questions/${id}`);
        setQuestion(res.data);
      } catch (err) {
        ErrorToast(err);
      }
    };
    getQuestion();
  }, []);

  if (!question) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="container border p-0 border-dark">
      <Card className="question-card">
        <CardBody>
          <CardText className="question-title">
            <span className="fw-bold fs-3">{question.title}</span>
          </CardText>
          <div id="texteditor" className="p-2">
            <RichText data={JSON.parse(question.content)} readOnly={true} />
          </div>
          <CardText className="question-metadata">
            <div className="text-muted">
              Asked by: {question.userId} on {formatDate(question.createdAt)}
            </div>
            <div className="d-flex align-items-center">
              <span className="text-muted me-2">
                {question.upVotes} upvotes, {question.downVotes} downvotes
              </span>
              <span className="text-muted">{question.views} views</span>
            </div>
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Question;
