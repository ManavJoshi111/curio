import { Routes, Route, Navigate } from "react-router-dom";

const PrivateRouteWrapper = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  if (token) return <Component {...rest} />;
  return <Navigate to="/signup" />;
};

export default PrivateRouteWrapper;
