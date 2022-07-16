import { Navbar, Nav, Button } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

const NavBar = ({ name, handleLogOut }) => {
  const margin = {
    margin: "0 10px",
  };

  return (
    <>
      <Navbar expand="lg" bg="primary" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" style={margin}>
            <Link className="nav-link" to="/">
              blogs
            </Link>
            <Link className="nav-link" to="/users">
              users
            </Link>
            <Navbar.Brand>
              {name && (
                <div>
                  {name} logged in
                  <Button variant="light" onClick={() => handleLogOut()}>
                    Logout
                  </Button>
                </div>
              )}
            </Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>
        <h1>blog app</h1>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
