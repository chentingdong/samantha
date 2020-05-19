import { Nav, Navbar } from "react-bootstrap"
import logo from "../../assets/img/bell-round-32x32.png"
import { withRouter, Link } from "react-router-dom"
import { Context } from "../context/store"
import { Auth } from "aws-amplify"
import React, { useContext } from "react"

const logout = async () => {
  await Auth.signOut()
}

const Header = (props) => {
  const { location } = props
  const { state, dispatch } = useContext(Context)

  return (
    <>
      {state.isAuthenticated && (
        <Navbar className="nav container-fluid " bg="light">
          <div className="row justify-content-between">
            <Navbar.Brand className="col-sm-1">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </Navbar.Brand>
            <Nav
              className="col-sm"
              variant="tabs"
              activeKey={location.pathname}
            >
              <Nav.Item>
                <Link to="/">Request Catalog</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/requests-made">Requests Made</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/requests-received">Requests Received</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/context-viewer">Context Viewer</Link>
              </Nav.Item>
            </Nav>
            <Navbar.Collapse className="col-sm-4">
              <Nav.Item>
                <Navbar.Text>{state?.user?.attributes?.email}</Navbar.Text>
              </Nav.Item>
              <Nav.Item>
                <Navbar.Text>
                  <button className="btn btn-link" onClick={logout}>
                    Logout
                  </button>
                </Navbar.Text>
              </Nav.Item>
            </Navbar.Collapse>
          </div>
        </Navbar>
      )}
    </>
  )
}

const HeaderWithRouter = withRouter(Header)

export { HeaderWithRouter }
