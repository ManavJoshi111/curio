import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get } from "../utils/axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Card from "./Card";
import Loading from "./Loading";
import { getTopics } from "../features/onboarding/actions/topicActions";

const Search = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    date: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm || filters.date) {
        searchQuestions();
      } else {
        setSearchResults([]);
      }
    }, 300); // Adjust delay as needed (300ms is a common choice)

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, filters]);

  const searchQuestions = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("content", searchTerm);
      for (const key in filters) {
        if (filters[key]) {
          queryParams.append(key, filters[key]);
        }
      }
      const response = await get(
        `/api/questions/search?${queryParams.toString()}`
      );
      setSearchResults(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchQuestions();
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleResultClick = (id) => {
    navigate(`/question/${id}`);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Container className="container-fluid bg-primary m-2 p-2">
          <Row>
            <Col md={3} className="d-flex align-items-center">
              <Form
                onSubmit={handleSearch}
                className="d-flex justify-content-between align-items-center"
              >
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col md={2}>
              <Form.Group className="d-flex align-items-center">
                <Form.Control
                  type="date"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {error && <p>Error: {error}</p>}
        </Container>
      </div>
      {loading && <Loading />}
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result) => (
            <Card
              key={result._id} // Add key prop
              createdAt={result.createdAt}
              navigateLink={`/question/${result._id}`}
              title={result.title}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default Search;
