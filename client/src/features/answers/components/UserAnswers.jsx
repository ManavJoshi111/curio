import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../../utils/axios";
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
  SERVER_URL,
} from "../../../utils/constants";
import Card from "../../../components/Card";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";

const UserAnswers = ({ userId }) => {
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserAnswers = async (page, limit = 5) => {
    setIsLoading(true);
    try {
      let baseUrl = "/api/answers/by-user/";
      if (userId) {
        baseUrl += `${userId}`;
      }
      const res = await get(
        `${baseUrl}?page=${page || PAGINATION_DEFAULT_PAGE}&limit=${
          limit || PAGINATION_DEFAULT_LIMIT
        }`
      );
      setAnswers(res?.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAnswers();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>; // Display a user-friendly error message
  }

  return (
    <>
      <div className="answer-list">
        {answers?.data?.map(
          ({ _id, content, createdAt, questionId }, index) => (
            <Card
              title={questionId.title}
              key={index}
              id={_id}
              content={content}
              createdAt={createdAt}
              navigateLink={`/question/${questionId._id}`}
            />
          )
        )}
        <Pagination
          currentPage={answers?.page}
          handleFn={fetchUserAnswers}
          totalPages={answers?.totalPages}
          className="mt-2"
        />
      </div>
    </>
  );
};

export default UserAnswers;
