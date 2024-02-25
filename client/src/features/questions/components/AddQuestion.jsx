import { Button } from "react-bootstrap";
import RichText from "../../../components/RichText";
import { useEffect, useState } from "react";

const AddQuestion = () => {
  useEffect(() => {
    console.log("rendering add question");
  });
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
  return (
    <>
      <div className="container border border-dark">
        <div className="fs-3 fw-bold">Add A Question </div>
        <RichText data={question} setData={setQuestion} />
        <Button className="mt-3 ms-auto p-2 m-2">Submit</Button>
      </div>
    </>
  );
};

export default AddQuestion;
