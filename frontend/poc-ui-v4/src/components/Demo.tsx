import React, { useState } from "react"
import { RequestCatalogList } from "./RequestCatalogList"
import { RequestsMadeList } from "./RequestsMadeList"
import { RequestsReceivedList } from "./RequestsReceivedList"
import { ContextViewCodes } from "./ContextViewCodes"
import { Grid, Row, Col, Nav, Dropdown } from "rsuite"
import { useQuery } from "@apollo/client"
import { AUTH_USER } from "../operations/queries/authUser"
import { Auth } from "aws-amplify"
import styled from "styled-components"
import tw from "tailwind.macro"
import logo from "../assets/img/bell.png"
function DemoRaw({ className }) {
  const [active, setActive] = useState("request-catelog")
  const { data } = useQuery(AUTH_USER)
  const logout = async () => {
    await Auth.signOut()
  }

  const [theme, setTheme] = useState("theme-dark")

  const toggleTheme = () => {
    const newTheme = theme === "theme-dark" ? "theme-elegant" : "theme-dark"
    setTheme(newTheme)
    console.log(newTheme)
  }
  return (
    <div className={`${className} ${theme}`}>
      {data?.authUser?.isAuthenticated && (
        <Grid fluid>
          <Row>
            <Col xs={4}>
              <img src={logo} alt="" className="logo" onClick={toggleTheme} />
              <h2 className="inline-block">Bellhop</h2>
              <Nav
                vertical
                activeKey={active}
                onSelect={(activeKey) => setActive(activeKey)}
              >
                <Nav.Item eventKey="request-catelog">Request Catalog</Nav.Item>
                <Nav.Item eventKey="requests-made">Requests Made</Nav.Item>
                <Nav.Item eventKey="requests-received">
                  Request Received
                </Nav.Item>
                <Nav.Item eventKey="context-viewer">Context Viewer</Nav.Item>
                <Dropdown title="User">
                  <Dropdown.Item eventKey="auth-user">
                    Signed in as {data?.authUser?.name}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="logout" onClick={logout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown>
              </Nav>
            </Col>
            <Col xs={20}>
              {active === "request-catelog" && <RequestCatalogList />}
              {active === "requests-made" && <RequestsMadeList />}
              {active === "requests-received" && <RequestsReceivedList />}
              {active === "context-viewer" && <ContextViewCodes />}
            </Col>
          </Row>
        </Grid>
      )}
    </div>
  )
}
const Demo = styled(DemoRaw)`
  ${tw`p-4`}
  color: var(--color-text-primary);
  color: var(--color-text-default);
  background-color: var(--color-bg-default);
  overflow: auto;
  height: 100vh;
  border-radius: 0;
  .logo {
    ${tw`my-0 mx-4`}
    height: 2em;
    display: inline-block;
  }
`

export { Demo }
