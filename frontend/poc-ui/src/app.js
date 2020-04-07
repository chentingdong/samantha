import React, { useState, useEffect } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";
import { BrowserRouter, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Routes from "./routes/routes";
import config from "./config.js";
import "./assets/app.scss";
import buildFonts from "./libs/fa-fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  buildFonts();
  Amplify.configure(config);

  async function getUserInfo() {
    try {
      const userInfo = await Auth.currentUserPoolUser();
      setUser(userInfo);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    Hub.listen("auth", async ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          getUserInfo();
          break;
        case "signOut":
          setIsAuthenticated(false);
          setUser({});
          break;
        case "signIn_failure":
          console.error("user sign in failed");
          break;
        default:
          break;
      }
    });
  }, []);

  async function federatedSignUp() {
    try {
      await Auth.federatedSignIn();
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleLogout() {
    try {
      await Auth.signOut();
      setIsAuthenticated(false);
      setUser({});
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="app wrapper vh-100">
      <BrowserRouter>
        <div className="d-flex align-items-start flex-column bg-secondary app-nav">
          <div className="mb-auto bd-highlight">
            <Nav.Link
              className="nav-link tex·t-success"
              as={NavLink}
              to="/home"
            >
              <h3>
                <FontAwesomeIcon icon="home" />
              </h3>
            </Nav.Link>
            <Nav.Link className="nav-link text-success" as={NavLink} to="/">
              <h3>
                <FontAwesomeIcon icon="th" />
              </h3>
            </Nav.Link>
          </div>
          <div className="bd-highlight">
            {isAuthenticated ? (
              <>
                <Nav.Link
                  className="text-success"
                  as={NavLink}
                  to="/user/settings"
                >
                  <h3>
                    <img
                      className="thumbnail-sm rounded-circle"
                      src={user.attributes.picture}
                      alt={<FontAwesomeIcon icon="cog" />}
                    />
                  </h3>
                </Nav.Link>
                <div className="nav-link text-success" onClick={handleLogout}>
                  <h3>
                    <FontAwesomeIcon icon="sign-out-alt" />
                  </h3>
                </div>
              </>
            ) : (
              <>
                <div
                  className="nav-link text-success"
                  onClick={federatedSignUp}
                >
                  <h3>
                    <FontAwesomeIcon icon="user-plus" />
                  </h3>
                </div>
                <Nav.Link
                  className="nav-link text-success"
                  as={NavLink}
                  to="/user/login"
                >
                  <h3>
                    <FontAwesomeIcon icon="sign-in-alt" />
                  </h3>
                </Nav.Link>
              </>
            )}
          </div>
        </div>
        <Routes appProps={{ isAuthenticated, setIsAuthenticated, user }} />
      </BrowserRouter>
    </div>
  );
}

export default App;
