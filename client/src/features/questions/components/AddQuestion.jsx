import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import RichText from "../../../components/RichText";
import { SuccessToast, ErrorToast } from "../../../utils/CustomToast";
import { post } from "../../../utils/axios";
import { SERVER_URL } from "../../../utils/constants";

const AddQuestion = () => {
  const navigate = useNavigate();
  const titleInputRef = useRef(null);
  const [question, setQuestion] = useState([
    {
      type: "paragraph",
      children: [
        {
          text: "",
        },
      ],
    },
  ]);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleAddQuestion = async () => {
    const questionTitle = titleInputRef.current.value;
    console.log("Adding question: ", questionTitle);
    if (!questionTitle.trim()) {
      ErrorToast("Question title cannot be empty");
      return;
    }
    if (question.every((node) => node.children[0].text.trim() === "")) {
      ErrorToast("Question content cannot be empty");
      return;
    }
    const res = await post(`${SERVER_URL}/api/questions/`, {
      title: questionTitle,
      content: JSON.stringify(question),
    });
    if (res.success) {
      SuccessToast(res.message);
      navigate("/");
    } else {
      ErrorToast(res.message);
    }
  };
  return (
    <>
      <div className="container border border-dark">
        <div className="fs-3 fw-bold">Add A Question </div>
        <div className="d-flex flex-column mb-3 align-items-start pt-1">
          <label htmlFor="question-title" className="fw-bold me-2">
            Title:
          </label>
          <input
            type="text"
            id="question-title"
            name="title"
            ref={titleInputRef}
            className="form-control p-2"
            placeholder="Write a clear and concise title for your question e.g. (How to revert a commit in git?)"
          />
        </div>
        <div id="texteditor">
          <RichText data={question} setData={setQuestion} />
        </div>
        <Button className="mt-3 ms-auto p-2 m-2" onClick={handleAddQuestion}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default AddQuestion;
