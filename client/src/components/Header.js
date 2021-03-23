import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { useAuth } from "../context/auth";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBacon } from "@fortawesome/free-solid-svg-icons";

const Header = ({ presentation, setPresentation }) => {
  const { authTokens } = useAuth();
  const { setAuthTokens } = useAuth();

  const handleLogOut = () => {
    setAuthTokens({ message: "logout", token: null, status: false });
  };
  return (
    <div style={{ position: "sticky", top: 0, marginBottom: 0 }}>
      <Navbar sticky="top" expand="lg">
        <Navbar.Brand style={{ pointerEvents: "none", color: "white" }}>
          festarikesä
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {authTokens.status && (
              <Nav.Link
                style={{ padding: 10, color: "black" }}
                onClick={handleLogOut}
              >
                {" "}
                kirjaudu ulos
              </Nav.Link>
            )}

            <Nav.Link
              style={{ padding: 10, color: "black" }}
              onClick={() => {
                setPresentation(!presentation);
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faBacon} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
