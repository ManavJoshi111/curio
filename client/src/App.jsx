import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRouteWrapper from "./HOC/PrivateRouteWrapper";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<PrivateRouteWrapper component={Home} path="/" />}
        />
        <Route
          path="/login"
          element={<PrivateRouteWrapper component={Login} path="/login" />}
        />
        <Route
          path="/signup"
          element={<PrivateRouteWrapper component={Signup} path="/signup" />}
        />
      </Routes>
    </>
  );
};

export default App;
