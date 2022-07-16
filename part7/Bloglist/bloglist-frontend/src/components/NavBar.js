import { Navbar, Nav, Button } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

const NavBar = ({ name, handleLogOut }) => {
  const margin = {
    margin: "0 10px",
  };

  return (
    <div>
      <Navbar className="mb-4" expand="lg" bg="primary" variant="dark">
        <div className="container">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" style={margin}>
              <Link className="nav-link my-auto" to="/">
                blogs
              </Link>
              <Link className="nav-link my-auto" to="/users">
                users
              </Link>
              <Navbar.Brand>
                {name && <p className="my-auto">{name} logged in</p>}
              </Navbar.Brand>
              {name && (
                <Button
                  className="mx-3 my-auto h-50"
                  variant="light"
                  size="sm"
                  onClick={() => handleLogOut()}
                >
                  Logout
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <div>
        <h1 className="mb-5">blog app</h1>
      </div>
      <Outlet />
    </div>
  );
};

export default NavBar;
