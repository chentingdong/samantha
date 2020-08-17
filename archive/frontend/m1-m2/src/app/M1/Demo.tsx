import React, { useState, useEffect } from "react"
import { RequestCatalogList } from "./RequestCatalogList"
import { RequestsActiveList } from "./RequestsActiveList"
import { RequestsReceivedList } from "./RequestsReceivedList"
import { ContextViewCodes } from "./ContextViewCodes"
import { Grid, Row, Col, Nav, Dropdown } from "rsuite"
import { useQuery } from "@apollo/client"
import { AUTH_USER } from "../../operations/queries/authUser"
import { Editor } from "./Editor"
import { BellEditor } from "./BellEditor"
import { Logout } from "components/Logout"
import styled from "styled-components"
import tw from "tailwind.macro"
import { injectRsuiteStyle, getLogoByTheme } from "../../utils/styles"
import "../../../dist/tailwind/tailwind.generated.css"

function DemoRaw({ className }) {
  const [active, setActive] = useState("requests-active")
  const { data } = useQuery(AUTH_USER)

  const [theme, setTheme] = useState("bell")

  const toggleTheme = () => {
    if (theme === "bell") {
      setTheme("dark")
    } else {
      setTheme("bell")
    }
  }

  useEffect(() => {
    injectRsuiteStyle(theme)
  }, [theme])

  if (!data) return <></>
  const { authUser } = data

  return (
    <div className={`${className} theme-${theme}`}>
      {authUser.isAuthenticated && (
        <>
          <Grid fluid>
            <Row>
              <Col xs={24} lg={4}>
                <div className="brand">
                  <img
                    src={getLogoByTheme(theme)}
                    alt=""
                    className={`logo ${theme}`}
                    onClick={toggleTheme}
                  />
                </div>
                <Nav
                  vertical
                  activeKey={active}
                  onSelect={(activeKey) => setActive(activeKey)}
                  className="main-menu"
                >
                  <Nav.Item
                    eventKey="requests-active"
                    className="requests-active"
                  >
                    All Active Bells
                  </Nav.Item>
                  {/* <Nav.Item eventKey="requests-made" className="requests-made">
                    Your Requested Work
                  </Nav.Item> */}
                  <Nav.Item
                    eventKey="requests-received"
                    className="requests-received"
                  >
                    Your Assigned Work
                  </Nav.Item>
                  <Nav.Item
                    eventKey="request-catalog"
                    className="request-catalog"
                  >
                    Bell Catalog
                  </Nav.Item>
                  <Nav.Item eventKey="context-viewer">Context Viewer</Nav.Item>
                  <Nav.Item disabled eventKey="auth-user">
                    Signed in as {authUser.name}
                  </Nav.Item>
                  <Nav.Item eventKey={null}>
                    <Logout />
                  </Nav.Item>
                </Nav>
              </Col>
              <Col xs={24} lg={20}>
                {active === "requests-active" && <RequestsActiveList />}
                {/* {active === "requests-made" && <RequestsMadeList />} */}
                {active === "requests-received" && <RequestsReceivedList />}
                {active === "request-catalog" && <RequestCatalogList />}
                {active === "context-viewer" && <ContextViewCodes />}
              </Col>
            </Row>
          </Grid>
          <Editor />
          <BellEditor />
        </>
      )}
    </div>
  )
}
const Demo = styled(DemoRaw)`
  color: var(--color-text-default);
  background-color: var(--color-bg-default);
  overflow: auto;
  height: 100vh;
  border-radius: 0;
  font-family: var(--font-body);
  .brand {
    ${tw`my-4`}
    .logo {
      ${tw`my-0 mx-4`}
      max-height: 2em;
      height: 100%;
      line-height: 1.2em;
    }
    h6 {
      line-height: 1em;
      font-style: italic;
    }
  }
`

export { Demo }
