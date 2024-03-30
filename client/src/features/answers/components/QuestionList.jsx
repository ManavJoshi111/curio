import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dropdown,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import Loading from "../../../components/Loading";
import { getQuestionsByTopics } from "../../questions/actions/questionActions";
import Card from "../../../components/Card";
import Pagination from "../../../components/Pagination";

const QuestionList = () => {
  const dispatch = useDispatch();
  const [queryParams, setQueryParams] = useState({
    topics: [],
    sortBy: "latest",
  });
  const { user } = useSelector((state) => state.user);
  const { questionsByTopic, loading, error } = useSelector(
    (state) => state.questionsByTopic
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleQuestionList();
  };

  const handleQuestionList = (page) => {
    dispatch(
      getQuestionsByTopics({
        page: page,
        topics: user?.topics,
      })
    );
  };

  useEffect(() => {
    handleQuestionList();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (questionsByTopic.length === 0) {
    return <div>No questions found</div>;
  }
  return (
    <div>
      {questionsByTopic?.data &&
        questionsByTopic?.data?.map((question, index) => (
          <Card
            key={index}
            id={index}
            title={question.title}
            createdAt={question.createdAt}
            navigateLink={`/answer/${question._id}`}
          />
        ))}
      <div className="mt-2">
        <Pagination
          handleFn={handleQuestionList}
          currentPage={questionsByTopic.page}
          totalPages={questionsByTopic.totalPages}
        />
      </div>
    </div>
  );
};

export default QuestionList;
