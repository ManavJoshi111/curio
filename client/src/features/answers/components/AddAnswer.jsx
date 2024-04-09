import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import RichText from "../../../components/RichText";
import { Badge, Button, CardText } from "react-bootstrap";
import { ErrorToast, SuccessToast } from "../../../utils/CustomToast";
import { post } from "../../../utils/axios";
import { SERVER_URL } from "../../../utils/constants";
import { formatDate } from "../../../utils/FormatDate";
import { getQuestionById } from "../../questions/actions/questionActions";

const AddAnswer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState([
    {
      type: "paragraph",
      children: [
        {
          text: "",
        },
      ],
    },
  ]);

  const handleAddAnswer = async () => {
    try {
      if (!answer) {
        ErrorToast("Answer content cannot be empty");
        return;
      }
      const res = await post(`${SERVER_URL}/api/answers/`, {
        questionId: id,
        content: answer,
      });
      SuccessToast(res.message);
      navigate("/");
    } catch (err) {
      ErrorToast(err.message);
    }
  };

  const { questionById, loading, error } = useSelector(
    (state) => state.questionById
  );

  useEffect(() => {
    (() => {
      dispatch(getQuestionById(id));
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>error</div>;
  }
  return Object.keys(questionById || {}).length ? (
    <>
      <div className="container shadow-lg rounded-4 mt-4 pt-2">
        <div className="fs-3 fw-bold">{questionById.title} </div>
        {questionById.topics.map((topic) => (
          <Badge className="ms-2 m-2">{topic.name}</Badge>
        ))}
        <div id="texteditor">
          <RichText data={JSON.parse(questionById.content)} readOnly={true} />
        </div>
        <CardText className="question-metadata">
          <div className="text-muted">
            Asked by: {questionById.userName} on{" "}
            {formatDate(questionById.createdAt)}
          </div>
          <div className="d-flex align-items-center">
            <span className="text-muted me-2">
              {questionById.upVotes} upvotes, {questionById.downVotes} downvotes
            </span>
            <span className="text-muted">{questionById.views} views</span>
          </div>
        </CardText>
        <div className="fs-3 fw-bold mt-4">Your answer: </div>
        <div id="texteditor">
          <RichText data={answer} setData={setAnswer} />
        </div>
        <Button className="mt-3 ms-auto p-2 m-2" onClick={handleAddAnswer}>
          Submit
        </Button>
      </div>
    </>
  ) : (
    <>
      <div>No questions found</div>
    </>
  );
};

export default AddAnswer;
