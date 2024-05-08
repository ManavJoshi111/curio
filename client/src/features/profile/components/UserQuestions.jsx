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

const UserQuestions = ({ userId, setQuestionCount }) => {
  const [titles, setTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuestionTitles = async (page, limit = 5) => {
    setIsLoading(true);
    try {
      let baseUrl = "/api/questions/titles";
      if (userId) {
        baseUrl += `/${userId}`;
      }
      const res = await get(
        `${baseUrl}?page=${page || PAGINATION_DEFAULT_PAGE}&limit=${
          limit || PAGINATION_DEFAULT_LIMIT
        }`
      );
      setTitles(res?.data);
      setQuestionCount(res?.data?.totalRecords || 0);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionTitles();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>; // Display a user-friendly error message
  }

  return (
    <>
      <div className="question-list">
        {titles?.data?.map(({ _id, title, createdAt }, index) => (
          <Card
            key={index}
            id={_id}
            title={title}
            createdAt={createdAt}
            navigateLink={`/question/${_id}`}
          />
        ))}
        <Pagination
          currentPage={titles?.page}
          handleFn={fetchQuestionTitles}
          totalPages={titles?.totalPages}
          className="mt-2"
        />
      </div>
    </>
  );
};

export default UserQuestions;
