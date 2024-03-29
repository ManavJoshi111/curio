import React from "react";
import "../styles/buttonLoader.css";

const ButtonLoader = () => {
  return (
    <div className="row container d-flex justify-content-center">
      <div className="col-md-4 col-sm-6 grid-margin stretch-card">
        <div className="jumping-dots-loader">
          <span></span> <span></span> <span></span>
        </div>
      </div>
    </div>
  );
};

export default ButtonLoader;
