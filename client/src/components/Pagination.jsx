import React from "react";
import BPagination from "react-bootstrap/Pagination";

const Pagination = ({ handleFn, currentPage, totalPages }) => {
  return (
    <BPagination>
      <BPagination.First onClick={() => handleFn(1)} />
      {[...Array(totalPages)].map((_, index) => (
        <BPagination.Item
          key={index}
          active={index + 1 === +currentPage}
          onClick={() => {
            handleFn(index + 1);
          }}
        >
          {index + 1}
        </BPagination.Item>
      ))}
      <BPagination.Last
        onClick={() => {
          handleFn(totalPages);
        }}
      />
    </BPagination>
  );
};

export default Pagination;
