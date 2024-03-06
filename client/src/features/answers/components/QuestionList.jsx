import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { post } from "../../../utils/axios";
import { SERVER_URL } from "../../../utils/constants";

const QuestionList = () => {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useSelector((state) => state.user);
  console.log("user: ", user);
  useEffect(() => {
    const fetchQuestionList = async () => {
      const res = await post(
        `${SERVER_URL}/api/questions/by-topic?page=&limit=`,
        {
          topics: user.topics.map((topic) => topic.topicId),
        }
      );
      console.log("RES: ", res);
    };
    fetchQuestionList();
  }, []);
  return <div>QuestionList</div>;
};

export default QuestionList;
