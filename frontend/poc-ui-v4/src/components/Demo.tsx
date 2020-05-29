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

function DemoRaw({ className }) {
  const [active, setActive] = useState("request-catelog")
  const { data } = useQuery(AUTH_USER)
  const logout = async () => {
    await Auth.signOut()
  }

  return (
    <div className={className}>
      {data?.authUser?.isAuthenticated && (
        <Grid fluid>
          <Row>
            <Col xs={4}>
              <h2>Bellhop</h2>
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
  color: var(--color-text-default);
  background-color: var(--color-bg-default);
  overflow: auto;
  height: 100vh;
  border-radius: 0;
  ${tw`p-4`}
`

export { Demo }
