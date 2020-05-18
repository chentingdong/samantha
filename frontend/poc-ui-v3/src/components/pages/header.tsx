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
        <Navbar className="nav justify-content-center" bg="light">
          <Navbar.Brand href="/">
            <img src={logo} alt="" />
          </Navbar.Brand>
          <Nav className="mr-auto" variant="tabs" activeKey={location.pathname}>
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
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>{state?.user?.attributes?.email}</Navbar.Text>
            <Navbar.Text>
              <button className="btn btn-link" onClick={logout}>
                Logout
              </button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      )}
    </>
  )
}

const HeaderWithRouter = withRouter(Header)

export { HeaderWithRouter }
