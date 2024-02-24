import React from "react";
import { useSelector } from "react-redux";
import OnboardUser from "../features/onboarding/components/OnboardUser";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  if (user.isOnboarded) {
    return (
      <p className="h1 text-center p-3 text-decoration-underline">
        Welcome back, {user.name}
      </p>
    );
  } else {
    return <OnboardUser />;
  }
};

export default Home;
