import React, { useEffect } from "react";
import Loading from "../../components/Loading";
const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    window.location.reload();
  }, []);
  return (
    <>
      <div className="container w-full h-full">
        <Loading />
      </div>
    </>
  );
};

export default Logout;
