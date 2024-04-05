import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OnboardUser from "../features/onboarding/components/OnboardUser";
import { Container } from "react-bootstrap";
import Feed from "../components/Feed";
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
  SERVER_URL,
} from "../utils/constants";
import { get } from "../utils/axios";
import Loading from "../components/Loading";

const HeroSectionBox = ({ title, text }) => {
  return (
    <>
      <div className="col-md-2 text-center flex-grow-1" id="hero-box">
        <span id="hero-box-title">{title}</span>
        <p id="hero-box-text">{text}</p>
      </div>
    </>
  );
};

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const [feedQuestions, setFeedQuestions] = useState();
  const [loading, setLoading] = useState(true);

  const getFeedQuestions = async (
    page = PAGINATION_DEFAULT_PAGE,
    limit = PAGINATION_DEFAULT_LIMIT
  ) => {
    try {
      const response = await get(
        `${SERVER_URL}/api/questions/feed?page=${page}&limit=${limit}`
      );
      setFeedQuestions(response.data);
    } catch (err) {
      console.log("Err while getting feed: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.isOnboarded) {
      setLoading(true);
      getFeedQuestions();
    }
  }, []);

  if (user.isOnboarded) {
    if (loading) {
      return <Loading />;
    }
    return (
      <>
        <Container
          className="d-flex justify-content-center align-items-center flex-column"
          fluid
        >
          <div className="fs-1 text-center" id="hero-title">
            <span className="fw-bold">Welcome to Curio!</span> Dive into
            captivating conversations.
          </div>
          <div id="hero-boxes" className="mt-4 row w-100 gap-3">
            <HeroSectionBox
              title={"Explore"}
              text={"Uncover trending treasures with fun"}
            />
            <HeroSectionBox
              title={"Learn"}
              text={"Get to know new things everyday!"}
            />
            <HeroSectionBox title={"Unleash"} text={"Unlock your inner geek"} />
            <HeroSectionBox
              title={"Connect"}
              text={"Connect with like-minded individuals"}
            />
          </div>
          <div className="feed-container w-100 mt-4">
            <Feed
              questions={feedQuestions.data}
              paginationData={{
                totalRecords: feedQuestions,
                page: feedQuestions.page,
                limit: feedQuestions.limit,
                totalPages: feedQuestions.totalPages,
              }}
              fetchData={getFeedQuestions}
            />
          </div>
        </Container>
      </>
    );
  } else {
    return <OnboardUser />;
  }
};

export default Home;
