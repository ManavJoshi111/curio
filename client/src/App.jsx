import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./styles/style.scss";
import Home from "./components/Home";
import PrivateRouteWrapper from "./HOC/PrivateRouteWrapper";
import { getUserData } from "./redux/actions/thunk";
import Signup from "./components/Signup";

const App = () => {
  const dispatch = useDispatch();

  const getUser = () => {
    try {
      dispatch(getUserData());
    } catch (err) {
      console.log("Error in getting the user: ", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<PrivateRouteWrapper component={Home} />}
        />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </>
  );
};

export default App;
