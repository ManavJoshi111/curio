import React from "react";
import { NavLink } from "react-router-dom";
import { Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import RichText from "../components/RichText";
import Loading from "../components/Loading";
import { PAGINATION_DEFAULT_LIMIT } from "../utils/constants";
import Interactions from "./Interactions";

const renderFeedQuestion = (question, key) => {
  return (
    <div key={key}>
      <div className="feed-question m-2">
        <div className="container-fluid  question-title-author d-flex justify-content-between align-items-center">
          <NavLink
            className="fs-4 text-decoration-none fw-bold"
            to={`/question/${question._id}`}
          >
            {question.title.slice(0, 40) + "..."}
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
        <Interactions
          entityId={question._id}
          isUpvoted={question.isUpvoted}
          isDownvoted={question.isDownvoted}
        />
      </div>
      <br />
    </div>
  );
};

const Feed = ({ questions, paginationData, fetchData }) => {
  return (
    <>
      <InfiniteScroll
        dataLength={paginationData.totalRecords}
        next={() => {
          fetchData(
            paginationData.page + 1,
            PAGINATION_DEFAULT_LIMIT * (paginationData.page + 1)
          );
        }}
        hasMore={paginationData.page === paginationData.totalPages}
        loader={<Loading />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {questions.map((question) =>
          renderFeedQuestion(question, question._id)
        )}
      </InfiniteScroll>
    </>
  );
};

export default Feed;
