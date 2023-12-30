import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import "./styles/style.scss";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
