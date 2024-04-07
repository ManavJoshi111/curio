import React, { useState } from "react";
import { ButtonGroup, Button, Badge } from "react-bootstrap";

const Vote = ({ initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [voted, setVoted] = useState(false);

  const handleUpVote = () => {
    if (!voted) {
      setVotes(votes + 1);
      setVoted(true);
    }
  };

  const handleDownVote = () => {
    if (!voted) {
      setVotes(votes - 1);
      setVoted(true);
    }
  };

  return (
    <ButtonGroup className="mt-2" style={{ width: "75px", height: "30px" }}>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleUpVote}
        className="rounded-pill me-1 border border-dark d-flex align-item-center"
          style={{ borderEndEndRadius: "0 !important", borderStartEndRadius: "0 !important"}}
      >
        <i className="far fa-arrow-up fw-bold fs-5 p-0"></i>
      </Button>
      <Button
        variant="secondary"
        size="sm"
        className="rounded-pill me-1 border border-dark d-flex align-item-center"
        //   style={{ borderRadius: "0 50% 50% 0" }}
        onClick={handleDownVote}
      >
        <i className="fa fa-arrow-down fw-bold fs-5 p-0"></i>
      </Button>
    </ButtonGroup>
  );
};

export default Vote;
