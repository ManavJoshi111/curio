import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { post } from "../../../utils/axios";
import Loading from "../../../components/Loading";
import { SERVER_URL } from "../../../utils/constants";

const QuestionList = () => {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchQuestionList = async () => {
      setLoading(true);
      const res = await post(
        `${SERVER_URL}/api/questions/by-topic?page=&limit=`,
        {
          topics: user.topics.map((topic) => topic.topicId),
        }
      );
      setQuestionList(res.data.data);
      setLoading(false);
    };
    fetchQuestionList();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (questionList.length === 0) {
    return <div>No questions found</div>;
  }
  return (
    <div>
      {questionList.map((question, index) => (
        <div key={index}>
          <h3>{question.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
