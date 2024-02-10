import React from "react";
import "../styles/loading.css";

const Loading = () => {
  return (
    <div className="d-flex img-loader justify-content-center align-items-center h-100 w-100">
      <img src="/assets/Curio-Bulb.png" alt="" />
    </div>
  );
};

export default Loading;
