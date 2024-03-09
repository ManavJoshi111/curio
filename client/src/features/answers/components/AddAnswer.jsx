import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import RichText from "../../../components/RichText";
import { Button } from "react-bootstrap";
import { ErrorToast, SuccessToast } from "../../../utils/CustomToast";
import { post } from "../../../utils/axios";
import { SERVER_URL } from "../../../utils/constants";

const AddAnswer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState(null);
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
      setLoading(true);
      if (answer.every((node) => node.children[0].text.trim() === "")) {
        ErrorToast("Answer content cannot be empty");
        return;
      }
      const res = await post(`${SERVER_URL}/api/answers/`, {
        questionId: id,
        content: JSON.stringify(answer),
      });
      SuccessToast(res.message);
      navigate("/");
    } catch (err) {
      ErrorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  const questionsByTopic = useSelector(
    (state) => state.questions.questionsByTopic
  );

  useEffect(() => {
    (() => {
      setQuestion(questionsByTopic?.data?.find((q) => q._id === id));
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container border border-dark">
        <div className="fs-3 fw-bold">{question.title} </div>
        <div id="texteditor">
          <RichText data={JSON.parse(question.content)} readOnly={true} />
        </div>
        <div className="fs-3 fw-bold mt-4">Your answer: </div>
        <div id="texteditor">
          <RichText data={answer} setData={setAnswer} />
        </div>
        <Button className="mt-3 ms-auto p-2 m-2" onClick={handleAddAnswer}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default AddAnswer;
