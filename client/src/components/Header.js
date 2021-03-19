import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { useAuth } from "../context/auth";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  const { authTokens } = useAuth();
  const { setAuthTokens } = useAuth();
  console.log(authTokens);
  console.log("authTokens");

  const handleLogOut = () => {
    setAuthTokens({ message: "logout", token: null, status: false });
  };
  return (
    <div style={{ position: "sticky", top: 0, marginBottom: 0 }}>
      {/* <Router> */}
      <Navbar sticky="top" /* bg="light" */ expand="lg">
        <Navbar.Brand
          /* href="#home" */ style={{ pointerEvents: "none", color: "white" }}
        >
          festarikesä
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {authTokens.status && (
              <NavLink
                style={{ padding: 10, color: "black" }}
                to={{
                  pathname: "/",
                  state: { personalBoard: false, userPage: false },
                }}
                onClick={handleLogOut}
              >
                {" "}
                kirjaudu ulos
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
