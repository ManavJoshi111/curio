import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";

const PrivateRouteWrapper = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user, loading, error } = useSelector((state) => state.user);
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

  if (user) {
    return (
      <>
        <Component {...rest} />
      </>
    );
  } else {
    return <Login />;
  }
};

export default PrivateRouteWrapper;
