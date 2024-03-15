import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import AddQuestion from "../features/questions/components/AddQuestion";
import ErrorPage from "../pages/ErrorPage";
import Profile from "../features/profile/components/Profile";
import ViewQuestion from "../features/questions/components/ViewQuestion";
import Logout from "../features/auth/Logout";
import AddAnswer from "../features/answers/components/AddAnswer";
import Answer from "../features/answers/components/Answers";
import SpacePage from "../features/space/SpacePage";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoutes component={Navbar} />}>
          <Route path="" element={<Home />} />
          <Route path="question" element={<AddQuestion />} />
          <Route path="answer" element={<Answer />} />
          <Route path="answer/:id" element={<AddAnswer />} />
          <Route path="question/:id" element={<ViewQuestion />} />
          <Route path="profile" element={<Profile />} />
          <Route path="space" element={<SpacePage />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default Router;
