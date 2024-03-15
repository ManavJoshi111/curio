import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ReactNavbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

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
              <Nav.Link className="px-3 fs-5" as={NavLink} to="/answer">
                Add Answer
              </Nav.Link>
              <Nav.Link className="px-3 fs-5" as={NavLink} to="/space">
                Space
              </Nav.Link>
              <Nav.Link className="px-3 fs-5" as={NavLink} to="/logout">
                Logout
              </Nav.Link>
              <Nav.Link
                className="px-3 fs-5 ms-auto me-2"
                as={NavLink}
                to="/profile"
              >
                {user && user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="profile-pic"
                    className="rounded-circle"
                    style={{ height: "2rem" }}
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
