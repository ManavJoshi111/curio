import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Select from "react-select";
import Loading from "../../../components/Loading";
import RichText from "../../../components/RichText";
import { getTopics } from "../../onboarding/actions/topicActions";
import { SuccessToast, ErrorToast } from "../../../utils/CustomToast";
import { get, put } from "../../../utils/axios";
import { SERVER_URL } from "../../../utils/constants";

const EditQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, topics } = useSelector((state) => state.topics);
  const { id } = useParams();
  const titleInputRef = useRef(null);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    titleInputRef.current?.focus();
    dispatch(getTopics());
    get(`${SERVER_URL}/api/questions/${id}`)
      .then((res) => {
        setQuestion(res.data?.[0]);
        console.log(res);
        setSelectedTopics(
          res.data?.[0].topics.map((topic) => ({
            label: topic.name,
            value: topic._id,
          }))
        );
      })
      .catch((err) => {
        console.error("Error fetching question:", err);
      });
  }, [id]);

  const handleEditQuestion = async () => {
    const questionTitle = titleInputRef.current.value;
    if (!questionTitle.trim()) {
      ErrorToast("Question title cannot be empty");
      return;
    }
    if (question.every((node) => node.children[0].text.trim() === "")) {
      ErrorToast("Question content cannot be empty");
      return;
    }
    console.log("Calling api: ", {
      title: questionTitle,
      content: question.content,
      topicIds: selectedTopics.map((topic) => topic.value),
    });
    const res = await put(`${SERVER_URL}/api/questions/${id}`, {
      title: questionTitle,
      content: JSON.stringify(question.content),
      topicIds: selectedTopics.map((topic) => topic.value),
    });
    if (res.success) {
      SuccessToast(res.message);
      navigate("/");
    } else {
      ErrorToast(res.message);
    }
  };

  if (loading || !question) {
    return <Loading />;
  }

  return (
    <div className="container border border-dark">
      <div className="fs-3 fw-bold">Edit Question</div>
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
          defaultValue={question.title}
        />
      </div>
      <div className="d-flex flex-column mb-3 align-items-start pt-1">
        <label htmlFor="question-topics" className="fw-bold me-2">
          Topics:
        </label>
        <Select
          isMulti
          options={topics.map((topic) => ({
            value: topic.topicId,
            label: topic.topicName,
          }))}
          className="w-100"
          value={selectedTopics}
          onChange={setSelectedTopics}
        />
      </div>

      <div id="texteditor">
        <RichText
          data={question.content && JSON.parse(question.content)}
          setData={setQuestion}
        />
      </div>
      <Button className="mt-3 ms-auto p-2 m-2" onClick={handleEditQuestion}>
        Submit
      </Button>
    </div>
  );
};

export default EditQuestion;
