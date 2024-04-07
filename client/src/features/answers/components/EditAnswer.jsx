import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import RichText from "../../../components/RichText";
import { put } from "../../../utils/axios";
import { SERVER_URL } from "../../../utils/constants";
import { ErrorToast, SuccessToast } from "../../../utils/CustomToast";
import { getAnswerByQuestion } from "../../answers/actions/answerActions";
const EditAnswer = ({ showModal, setShowModal, answer }) => {
  const dispatch = useDispatch();
  const [editedAnswer, setEditedAnswer] = useState(answer.content);

  const handleClose = () => setShowModal(false);

  const handleSave = async () => {
    try {
      const response = await put(`${SERVER_URL}/api/answers/${answer._id}`, {
        questionId: answer.questionId,
        content: editedAnswer,
      });
      SuccessToast(response.message);
      dispatch(getAnswerByQuestion(answer.questionId));
      setShowModal(false);
    } catch (err) {
      ErrorToast("You have not edited anything or an error has occurred!");
      console.log("Err:", err);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="xl"
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Answer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="texteditor">
          <RichText
            data={editedAnswer && JSON.parse(editedAnswer)}
            setData={setEditedAnswer}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAnswer;
