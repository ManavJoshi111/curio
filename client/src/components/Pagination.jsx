import React from "react";
import BPagination from "react-bootstrap/Pagination";

const Pagination = ({ handleFn, currentPage, totalPages, className = "" }) => {
  return (
    <BPagination className={className}>
      <BPagination.First onClick={() => handleFn(1)} />
      {[...Array(totalPages)].slice(0,20).map((_, index) => (
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
