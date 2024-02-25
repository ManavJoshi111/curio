import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import RichText from "../../../components/RichText";
import { SuccessToast, ErrorToast } from "../../../utils/CustomToast";
import { post } from "../../../utils/axios";
import { SERVER_URL } from "../../../utils/constants";

const AddQuestion = () => {
  const navigate = useNavigate();
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

  const handleAddQuestion = async () => {
    console.log("Adding question: ", question);
    if (question.every((node) => node.children[0].text.trim() === "")) {
      ErrorToast("Question cannot be empty");
      return;
    }
    const res = await post(`${SERVER_URL}/api/questions/`, {
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
        <RichText data={question} setData={setQuestion} />
        <Button className="mt-3 ms-auto p-2 m-2" onClick={handleAddQuestion}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default AddQuestion;
