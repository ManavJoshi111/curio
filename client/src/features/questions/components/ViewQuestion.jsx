import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  Modal,
} from "react-bootstrap";
import { formatDate } from "../../../utils/FormatDate";
import { getQuestionById } from "../actions/questionActions";
import Loading from "../../../components/Loading";
import RichText from "../../../components/RichText";
import { del } from "../../../utils/axios";
import { ErrorToast, SuccessToast } from "../../../utils/CustomToast";
import { SERVER_URL } from "../../../utils/constants";

const Question = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { loading, error, questionById } = useSelector(
    (state) => state.questionById
  );
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getQuestionById(id));
  }, []);

  if (loading || !questionById) {
    return <Loading />;
  }

  if (error) {
    return ErrorToast(error.message);
  }

  const handleDeleteQuestion = async () => {
    try {
      const res = await del(`${SERVER_URL}/api/questions/${id}`);
      if (res.success) {
        SuccessToast(res.message);
        navigate("/");
      } else {
        ErrorToast(res.message);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      ErrorToast("An error occurred while deleting the question");
    }
  };

  return (
    <div className="container border p-0 border-dark">
      <Card className="question-card">
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardText className="question-title mx-2">
              <span className="fw-bold fs-3">{questionById.title}</span>
            </CardText>
            <div className="d-flex justify-content-between align-items-center">
              {(questionById.userId === user._id ||
                user.role === "moderator") && (
                <>
                  <NavLink
                    to={`/edit-question/${questionById._id}`}
                    className="btn btn-primary mx-2"
                  >
                    Edit Question
                  </NavLink>
                  <Button
                    onClick={() => setShowConfirmationModal(true)}
                    className="btn btn-danger mx-2"
                  >
                    Delete Question
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="">
            {questionById.topics.map((topic) => (
              <Badge className="ms-2 m-2">{topic.name}</Badge>
            ))}
          </div>
          <div id="texteditor" className="p-2">
            {questionById?.content && (
              <RichText
                data={JSON.parse(questionById.content)}
                readOnly={true}
              />
            )}
          </div>
          <CardText className="question-metadata">
            <div className="text-muted">
              Asked by: {questionById.userName} on{" "}
              {formatDate(questionById.createdAt)}
            </div>
            <div className="d-flex align-items-center">
              <span className="text-muted me-2">
                {questionById.upVotes} upvotes, {questionById.downVotes}{" "}
                downvotes
              </span>
              <span className="text-muted">{questionById.views} views</span>
            </div>
          </CardText>
        </CardBody>
      </Card>
      <Modal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this question?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmationModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteQuestion}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Question;
