import React from "react";

const Home = ({ prop }) => {
  return (
    <>
      <p className="h1 text-center p-3 text-decoration-underline">Home</p>
      <h1>{prop}</h1>
    </>
  );
};

export default Home;
