import { Navbar, Nav, Button } from "react-bootstrap";

const NavBar = ({ name, handleLogOut }) => {
  const margin = {
    margin: "0 10px",
  };

  return (
    <Navbar expand="lg" bg="primary" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto" style={margin}>
          <Nav.Link href="#blogs">blogs</Nav.Link>
          <Nav.Link href="#users">users</Nav.Link>
          <Navbar.Brand>
            {name && (
              <div>
                {name} logged in
                {/* <form> */}
                <Button variant="light" onClick={() => handleLogOut()}>
                  Logout
                </Button>
                {/* </form> */}
              </div>
            )}
          </Navbar.Brand>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
