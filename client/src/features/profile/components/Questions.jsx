import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../../utils/axios";
import { SERVER_URL } from "../../../utils/constants";
import Card from "../../../components/Card";
import Loading from "../../../components/Loading";

// TODO : Handle pagination
const Questions = () => {
  const [titles, setTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionTitles = async () => {
      setIsLoading(true);
      try {
        const res = await get(`${SERVER_URL}/api/questions/titles`);
        setTitles(res?.data?.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

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
        {titles?.map(({ _id, title, createdAt }, index) => (
          <Card
            key={index}
            id={_id}
            title={title}
            createdAt={createdAt}
            navigateLink={`/question/${_id}`}
          />
        ))}
      </div>
    </>
  );
};

export default Questions;
