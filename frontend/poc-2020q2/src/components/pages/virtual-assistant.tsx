import * as React from 'react'
import { Tab, Nav, Row, Col } from 'react-bootstrap'
import { Requests, RequestsMade, RequestsReceived } from '../request/requests'
import { RequestDefsMenu } from '../request/request-defs-menu'
import { CreateRequestDef } from '../request/create-request'

function VirtualAssistant() {
  return (
    <div className="container-fluid">
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
          <div className="col-10">
            <Tab.Content>
              <Tab.Pane eventKey="requestMenu">
                <RequestDefsMenu></RequestDefsMenu>
              </Tab.Pane>
              <Tab.Pane eventKey="requestMade">
                <RequestsMade></RequestsMade>
              </Tab.Pane>
              <Tab.Pane eventKey="requestReceived">
                <RequestsReceived></RequestsReceived>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </div>
  )
}

export default VirtualAssistant
