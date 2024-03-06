import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import QuestionList from "./QuestionList";

const Answer = () => {
  return (
    <>
      <div className="container">
        <Tabs
          defaultActiveKey="interests"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="interests" title="Interests">
            <QuestionList />
          </Tab>
          <Tab eventKey="question-for-you" title="For you">
            Questions for you
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Answer;
