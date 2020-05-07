import * as React from 'react'
import { useContext, useState, useEffect } from 'react'
import { Tab, Nav } from 'react-bootstrap'
import { RequestsMade, RequestsReceived } from '../request/requests-menu'
import { RequestDefsMenu } from '../request/request-defs-menu'
import { EditRequest } from '../request/edit-request'
import {
  RequestViewResponder,
  RequestViewRequester,
} from '../request/request-view'

function VirtualAssistant() {
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
        <EditRequest />
        <RequestViewRequester />
        <RequestViewResponder />
      </main>
      <footer className="border-top small"></footer>
    </div>
  )
}

export default VirtualAssistant
