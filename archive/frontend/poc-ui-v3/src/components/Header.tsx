import { Link, withRouter } from "react-router-dom"
import { Nav, Navbar } from "react-bootstrap"

import { AUTH_USER } from "../operations/queries/authUser"
import { Auth } from "aws-amplify"
import React from "react"
import logo from "../assets/img/bell-round-32x32.png"
import { useQuery } from "@apollo/client"

const logout = async () => {
  await Auth.signOut()
}

const Header = (props) => {
  const { location } = props
  const { data } = useQuery(AUTH_USER)
  return (
    <>
      {data?.authUser?.isAuthenticated && (
        <Navbar className="nav container-fluid " bg="light">
          <div className="row justify-content-between">
            <Navbar.Brand className="col-1">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </Navbar.Brand>
            <Nav className="col" variant="tabs" activeKey={location.pathname}>
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
            <Navbar.Collapse className="col-4">
              <Nav.Item>
                <Navbar.Text>{data?.authUser?.email}</Navbar.Text>
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
