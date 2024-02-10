import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ReactNavbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <ReactNavbar expand="lg" className="bg-body-tertiary mt-0 pt-1">
        <Container fluid={true}>
          <ReactNavbar.Brand as={NavLink}>
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
              <Nav.Link className="px-3 fs-5" as={NavLink} to="/add-question">
                Add Question
              </Nav.Link>
              <Nav.Link className="px-3 fs-5" as={NavLink} to="/add-answer">
                Add Answer
              </Nav.Link>
              <Nav.Link
                className="px-3 fs-5 ms-auto me-2"
                as={NavLink}
                to="/profile"
              >
                <i className="far fa-user-circle fw-bold fs-3"></i>
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
