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
import { useContext } from 'react'
import { Animated } from 'react-animated-css'
import { RequestCatalogList } from '../blocks/RequestCatalogList'
import { RequestsMadeList } from '../blocks/RequestsMadeList'
import { RequestsReceivedList } from '../blocks/RequestsReceivedList'

function VirtualAssistant() {
  const { state, dispatch } = useContext(Context)

  return (
    <div className="container-fluid">
      <main>
        <Tab.Container defaultActiveKey="requestCatalog">
          <div className="row">
            <div
              className="col-2 mt-4"
              onClick={(e) => dispatch({ type: 'resetUi' })}
            >
              <Nav className="flex-column">
                <Nav.Link
                  className="mt-2 btn btn-light text-left"
                  eventKey="requestCatalog"
                >
                  Request Catalog
                </Nav.Link>
                <Nav.Link
                  className="mt-2 btn btn-light text-left"
                  eventKey="requestsMade"
                >
                  Requests Made
                </Nav.Link>
                <Nav.Link
                  className="mt-2 btn btn-light text-left"
                  eventKey="requestsReceived"
                >
                  Requests Received
                </Nav.Link>
              </Nav>
            </div>
            <div className="col-10 pt-2">
              <Tab.Content>
                <Tab.Pane eventKey="requestCatalog" className="vh-100">
                  <RequestCatalogList />
                </Tab.Pane>
                <Tab.Pane eventKey="requestsMade" className="vh-100">
                  <RequestsMadeList />
                </Tab.Pane>
                <Tab.Pane eventKey="requestsReceived" className="vh-100">
                  <RequestsReceivedList />
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
        <RequestViewRequester />
        <RequestViewResponder />
      </main>

      <footer className="border-top small">
        <ContextViewCodes />
      </footer>
    </div>
  )
}

export default VirtualAssistant
