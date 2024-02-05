import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
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
