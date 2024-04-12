import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./features/auth/actions/userActions";
import Router from "./routes/Router";
import Loading from "./components/Loading";
import { ErrorToast } from "./utils/CustomToast";
import ConnectionDown from "./pages/ConnectionDown";

const App = () => {
  const token = localStorage.getItem("token");
  const dispath = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const getUser = () => {
      dispath(getUserData());
    };
    if (token) {
      getUser();
    }
    window.addEventListener(
      "online",
      function (e) {
        setOnline(true);
      },
      false
    );

    window.addEventListener(
      "offline",
      function (e) {
        setOnline(false);
      },
      false
    );
  }, []);

  if (online) {
    if (loading) {
      return (
        <div className="vh-100 vw-100">
          <Loading />
        </div>
      );
    }
    if (error) {
      ErrorToast(error);
      localStorage.removeItem("token");
      window.location.reload();
    }

    if (!token || user) {
      return <Router />;
    } else {
      return (
          <Loading />
      );
    }
  } else {
    return <ConnectionDown />;
  }
};

export default App;
