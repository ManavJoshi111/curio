import React from "react";
import { NavLink } from "react-router-dom";
import { Image } from "react-bootstrap";
import RichText from "../components/RichText";

const renderFeedQuestion = (question, key) => {
  return (
    <div key={key}>
      <div className="feed-question m-2">
        <div className="container-fluid  question-title-author d-flex justify-content-between align-items-center">
          <NavLink
            className="fs-4 text-decoration-none"
            to={`/question/${question._id}`}
          >
            {question.title}
          </NavLink>
          <div className="askedBy-data d-flex justify-content-center align-items-center flex-column mt-2">
            <Image
              className="rounded-circle border shadow mb-2"
              src={question.askedByUserProfile}
              // alt={userData.name}
              width="45"
              height="45"
            />
            <NavLink
              className="fs-6 text-decoration-none"
              to={`/profile/${question.askedByUserId}`}
            >
              {question.askedByUserName}
            </NavLink>
          </div>
        </div>
        <div className="container-fluid question-content">
          <RichText data={JSON.parse(question.content)} readOnly />
        </div>
      </div>
    </div>
  );
};

const Feed = ({ questions }) => {
  if (questions?.length) {
    return (
      <>
        {questions.map((question) =>
          renderFeedQuestion(question, question._id)
        )}
      </>
    );
  } else {
    return <h1>There are not any questions in your feed!</h1>;
  }
};

export default Feed;
