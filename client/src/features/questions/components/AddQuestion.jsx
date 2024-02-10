import { Button } from "react-bootstrap";
import RichText from "../../../components/RichText";

const AddQuestion = () => {
  return (
    <>
      <div className="container border border-dark">
        <div className="fs-3 fw-bold">Add A Question </div>
        <RichText />
        <Button className="mt-3 ms-auto p-2 m-2">Submit</Button>
      </div>
    </>
  );
};

export default AddQuestion;
