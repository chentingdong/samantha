import { Nav, Navbar } from "react-bootstrap"
import logo from "../../assets/img/bell-round-32x32.png"
import { withRouter } from "react-router-dom"
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
            <Navbar.Brand className="col-sm-1" href="/">
              <img src={logo} alt="" />
            </Navbar.Brand>
            <Nav
              className="col-sm"
              variant="tabs"
              activeKey={location.pathname}
            >
              <Nav.Item>
                <Nav.Link href="/">Request Catalog</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/requests-made">Requests Made</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/requests-received">Requests Received</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/context-viewer">Context Viewer</Nav.Link>
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
