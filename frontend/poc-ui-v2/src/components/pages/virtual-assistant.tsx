import * as React from 'react'
import { Tab, Nav } from 'react-bootstrap'
import { RequestsMade, RequestsReceived } from '../request/requests-menu'
import { RequestDefsMenu } from '../request/request-defs-menu'
import { EditRequest } from '../request/edit-request'
import {
  RequestViewResponder,
  RequestViewRequester,
} from '../request/request-view'
import { Context } from '../context/store'
import { ContextViewCodes } from '../context/context-view-codes'
import { EditRequestDef } from '../request/edit-request-def'
import { useContext } from 'react'

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
        <RequestViewRequester />
        <RequestViewResponder />
      </main>
      <div
        className="col-10 offset-2 position-absolute bg-white"
        style={{ top: '0', zIndex: 5 }}
      >
        {state.uiState.showEditRequestDef && (
          <div className="vh-100">
            <EditRequestDef />
          </div>
        )}
        {state.uiState.showEditRequest && (
          <div className="vh-100">
            <EditRequest />
          </div>
        )}
      </div>
      <footer className="border-top small">
        <ContextViewCodes />
      </footer>
    </div>
  )
}

export default VirtualAssistant
