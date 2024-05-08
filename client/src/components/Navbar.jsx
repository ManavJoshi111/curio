import {
  Container,
  Nav,
  Navbar as ReactNavbar,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image } from "react-bootstrap";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <ReactNavbar
        expand="lg"
        className="bg-body-tertiary mt-0 pt-1 pb-1"
        sticky="top"
      >
        <Container fluid={true}>
          <ReactNavbar.Brand as={NavLink} to="/">
            <img
              src="/assets/Curio-Logo.png"
              style={{ height: "3rem", marginTop: "0", paddingTop: "0" }}
            ></img>
          </ReactNavbar.Brand>
          <ReactNavbar.Toggle aria-controls="basic-navbar-nav" />
          <ReactNavbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex align-items-center w-100">
              <Nav.Link className="px-3 fs-5" as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link className="px-3 fs-5" as={NavLink} to="/question">
                Add Question
              </Nav.Link>
              <Nav.Link className="px-3 fs-5" as={NavLink} to="/answer-section">
                Add Answer
              </Nav.Link>
              {/* <Nav.Link className="px-3 fs-5" as={NavLink} to="/space">
                Space
              </Nav.Link> */}
              <Nav.Link className="px-3 fs-5" as={NavLink} to="/search">
                Search
              </Nav.Link>
              <Nav.Link className="px-3 fs-5" as={NavLink} to="/logout">
                Logout
              </Nav.Link>
              <Nav.Link
                className="px-3 fs-5 me-2 ms-auto"
                as={NavLink}
                to="/profile"
              >
                {user && user.profilePic ? (
                  <Image
                    className="rounded-circle border shadow"
                    src={user.profilePic}
                    alt={user.name}
                    style={{ height: "2rem", width: "2rem" }}
                  />
                ) : (
                  <i className="far fa-user-circle fw-bold fs-3"></i>
                )}
              </Nav.Link>
            </Nav>
          </ReactNavbar.Collapse>
        </Container>
      </ReactNavbar>
      <Outlet />
    </>
  );
};

export default Navbar;
