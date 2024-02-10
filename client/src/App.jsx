import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./features/auth/actions/userActions";
import Router from "./routes/Router";
import Loading from "./components/Loading";

const App = () => {
  const token = localStorage.getItem("token");
  const dispath = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = () => {
      dispath(getUserData());
    };
    if (token) {
      getUser();
    }
  }, []);

  if (loading) {
    return (
      <div className="vh-100 vw-100">
        <Loading />
      </div>
    );
  }
  if (error) {
    return <h1>Some error occurred...</h1>;
  }
  if (!token || user) {
    return <Router />;
  } else {
    return (
      <div className="vh-100 vw-100">
        <Loading />
      </div>
    );
  }
};

export default App;
