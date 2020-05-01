import * as React from 'react'
import { useContext, useState } from 'react'
import { Tab, Nav, Row, Col } from 'react-bootstrap'
import { Requests, RequestsMade, RequestsReceived } from '../request/requests'
import { RequestDefsMenu } from '../request/request-defs-menu'
import { Context } from '../context/store'

function VirtualAssistant() {
  const { state, dispatch } = useContext(Context)

  return (
    <div className="container-fluid">
      <main>
        <Tab.Container defaultActiveKey="requestMenu">
          <div className="row">
            <div className="col-2 mt-4">
              <Nav className="flex-column">
                <Nav.Link className="mt-2 btn btn-light" eventKey="requestMenu">
                  requestMenu
                </Nav.Link>
                <Nav.Link className="mt-2 btn btn-light" eventKey="requestMade">
                  requestMade
                </Nav.Link>
                <Nav.Link
                  className="mt-2 btn btn-light"
                  eventKey="requestReceived"
                >
                  requestReceived
                </Nav.Link>
              </Nav>
            </div>
            <div className="col-10 pt-2">
              <Tab.Content>
                <Tab.Pane eventKey="requestMenu" className="vh-100">
                  <RequestDefsMenu></RequestDefsMenu>
                </Tab.Pane>
                <Tab.Pane eventKey="requestMade" className="vh-100">
                  <RequestsMade></RequestsMade>
                </Tab.Pane>
                <Tab.Pane eventKey="requestReceived" className="vh-100">
                  <RequestsReceived></RequestsReceived>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
      </main>
      <footer className="vh-25 overflow-scroll border-top small">
        <h5>context state</h5>
        <pre>
          <code>{JSON.stringify(state, null, 2)}</code>
        </pre>
      </footer>
    </div>
  )
}

export default VirtualAssistant
