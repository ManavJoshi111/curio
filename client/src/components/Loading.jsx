import React from "react";
import "../styles/loading.css";

const Loading = () => {
  return (
    <div className="d-flex img-loader justify-content-center align-items-center vh-100 vw-100">
      <img src="/assets/Curio-Bulb.png" alt="" />
    </div>
  );
};

export default Loading;
