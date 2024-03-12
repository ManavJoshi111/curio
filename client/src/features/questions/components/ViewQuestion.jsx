import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardText } from "react-bootstrap";
import { formatDate } from "../../../utils/FormatDate";
import { getQuestionById } from "../actions/questionActions";
import Loading from "../../../components/Loading";
import RichText from "../../../components/RichText";
import { ErrorToast } from "../../../utils/CustomToast";

const Question = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, questionById } = useSelector(
    (state) => state.questions
  );

  useEffect(() => {
    dispatch(getQuestionById(id));
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return ErrorToast(error.message);
  }
  return (
    <div className="container border p-0 border-dark">
      <Card className="question-card">
        <CardBody>
          <CardText className="question-title">
            <span className="fw-bold fs-3">{questionById.title}</span>
          </CardText>
          <div id="texteditor" className="p-2">
            <RichText data={JSON.parse(questionById.content)} readOnly={true} />
          </div>
          <CardText className="question-metadata">
            <div className="text-muted">
              Asked by: {questionById.userId} on{" "}
              {formatDate(questionById.createdAt)}
            </div>
            <div className="d-flex align-items-center">
              <span className="text-muted me-2">
                {questionById.upVotes} upvotes, {questionById.downVotes}
                downvotes
              </span>
              <span className="text-muted">{questionById.views} views</span>
            </div>
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Question;
