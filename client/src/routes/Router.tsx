import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import AddQuestion from "../features/questions/components/AddQuestion";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoutes component={Navbar} />}>
          <Route path="" element={<Home />} />
          <Route path="add-question" element={<AddQuestion />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
