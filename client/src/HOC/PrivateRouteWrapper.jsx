import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserData } from "../redux/actions/thunk";

const PrivateRouteWrapper = ({ component: Component, path, ...rest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user, loading, error } = useSelector((state) => state.user);
  console.log("state: ", user, loading, error);
  const getUser = () => {
    try {
      dispatch(getUserData());
    } catch (err) {
      console.log("Error in getting the user: ", err);
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    } else {
      navigate("/login");
    }
  }, []);

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
  if (user) {
    if (path === "/login" || path === "/signup") {
      return <Navigate to="/" />;
    }
    return (
      <>
        <Component {...rest} />
      </>
    );
  } else {
    if (path === "/login" || path === "/signup") {
      return (
        <>
          <Component {...rest} />
        </>
      );
    }
    return <Navigate to="/login" />;
  }
};

export default PrivateRouteWrapper;
