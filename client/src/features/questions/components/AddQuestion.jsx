import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Select from "react-select";
import Loading from "../../../components/Loading";
import RichText from "../../../components/RichText";
import { getTopics } from "../../onboarding/actions/topicActions";
import { SuccessToast, ErrorToast } from "../../../utils/CustomToast";
import { post } from "../../../utils/axios";
import { SERVER_URL } from "../../../utils/constants";

const AddQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, topics } = useSelector((state) => state.topics);
  const titleInputRef = useRef(null);
  const [selectedTopics, setSelectedTopics] = useState([]);
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
    if (topics.length === 0) {
      dispatch(getTopics());
    }
  }, []);

  const handleAddQuestion = async () => {
    const questionTitle = titleInputRef.current.value;
    if (!questionTitle.trim()) {
      ErrorToast("Question title cannot be empty");
      return;
    }
    if (!question) {
      ErrorToast("Question content cannot be empty");
      return;
    }
    const res = await post(`${SERVER_URL}/api/questions/`, {
      title: questionTitle,
      content: question,
      topicIds: selectedTopics,
    });
    if (res.success) {
      SuccessToast(res.message);
      navigate("/");
    } else {
      ErrorToast(res.message);
    }
  };
  if (loading) {
    return <Loading />;
  }
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
        <div className="d-flex flex-column mb-3 align-items-start pt-1">
          <label htmlFor="question-title" className="fw-bold me-2">
            Topics:
          </label>
          <Select
            isMulti
            options={topics.map((topic) => ({
              value: topic.topicId,
              label: topic.topicName,
            }))}
            className="w-100"
            onChange={(currentTopics) => {
              setSelectedTopics(
                currentTopics.map((topic) => {
                  return {
                    topicId: topic.value,
                  };
                })
              );
            }}
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
