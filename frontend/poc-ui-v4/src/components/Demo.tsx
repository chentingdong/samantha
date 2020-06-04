import React, { useState } from "react"
import { RequestCatalogList } from "./RequestCatalogList"
import { RequestsMadeList } from "./RequestsMadeList"
import { RequestsReceivedList } from "./RequestsReceivedList"
import { ContextViewCodes } from "./ContextViewCodes"
import { Grid, Row, Col, Nav, Dropdown } from "rsuite"
import { useQuery } from "@apollo/client"
import { AUTH_USER } from "../operations/queries/authUser"
import { Editor } from "./Editor"
import { Auth } from "aws-amplify"
import styled from "styled-components"
import tw from "tailwind.macro"
import logo from "../assets/img/bell.png"

function DemoRaw({ className }) {
  const [active, setActive] = useState("requests-made")
  const { data } = useQuery(AUTH_USER)
  const logout = async () => {
    await Auth.signOut()
  }

  const [theme, setTheme] = useState("theme-dark")

  const toggleTheme = () => {
    const newTheme = theme === "theme-dark" ? "theme-elegant" : "theme-dark"
    setTheme(newTheme)
  }
  return (
    <div className={`${className} ${theme}`}>
      {data?.authUser?.isAuthenticated && (
        <>
          <Grid fluid>
            <Row>
              <Col xs={24} lg={4}>
                <div className="brand">
                  <img
                    src={logo}
                    alt=""
                    className="logo"
                    onClick={toggleTheme}
                  />
                  <div className="inline-block">
                    <h1>Bellhop</h1>
                    <h6>work engagement platform</h6>
                  </div>
                </div>
                <Nav
                  vertical
                  activeKey={active}
                  onSelect={(activeKey) => setActive(activeKey)}
                >
                  <Nav.Item eventKey="requests-made">Requests Made</Nav.Item>
                  <Nav.Item eventKey="requests-received">
                    Request Received
                  </Nav.Item>
                  <Nav.Item eventKey="request-catalog">
                    Request Catalog
                  </Nav.Item>
                  <Nav.Item eventKey="context-viewer">Context Viewer</Nav.Item>
                  <Dropdown noCaret title="User">
                    <Dropdown.Item disabled eventKey="auth-user">
                      Signed in as {data?.authUser?.name}
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="logout" onClick={logout}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown>
                </Nav>
              </Col>
              <Col xs={24} lg={20}>
                {active === "request-catalog" && <RequestCatalogList />}
                {active === "requests-made" && <RequestsMadeList />}
                {active === "requests-received" && <RequestsReceivedList />}
                {active === "context-viewer" && <ContextViewCodes />}
              </Col>
            </Row>
          </Grid>
          <Editor />
        </>
      )}
    </div>
  )
}
const Demo = styled(DemoRaw)`
  ${tw`p-4`}
  color: var(--color-text-primary);
  background-color: var(--color-bg-default);
  overflow: auto;
  height: 100vh;
  border-radius: 0;
  .brand {
    .logo {
      ${tw`my-0 mx-4`}
      max-height: 3em;
      height: 100%;
      display: inline-block;
      vertical-align: top;
    }
    h1 {
      line-height: 1.2em;
    }
    h6 {
      line-height: 1em;
      font-style: italic;
      text-transform: uppercase;
    }
  }
`

export { Demo }
