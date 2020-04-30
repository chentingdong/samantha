import * as React from 'react'
import { Tab, Nav, Row, Col } from 'react-bootstrap'
import { Requests, RequestsMade, RequestsReceived } from '../request/requests'
import { RequestDefsMenu } from '../request/request-defs-menu'
import { CreateRequestDef } from '../request/create-block-def'
import { Context } from '../context/store'
import { useContext, useState } from 'react'

function VirtualAssistant() {
  const { state, dispatch } = useContext(Context)
  // TODO: ui component goes to context
  const [showCreateRequestDef, setShowCreateRequestDef] = useState(false)

  const toggleCreateRequestDef = () => {
    setShowCreateRequestDef(!showCreateRequestDef)
  }

  return (
    <div className="container-fluid">
      <div
        className="btn btn-link col-2 offset-10"
        style={{ top: '0', right: '0', zIndex: '100' }}
        onClick={toggleCreateRequestDef}
      >
        {showCreateRequestDef ? (
          <span>Return to menu</span>
        ) : (
          <span>Add Request to Menu</span>
        )}
      </div>
      {showCreateRequestDef && (
        <div
          className="col-10 offset-2 position-fixed bg-white"
          style={{ zIndex: '5' }}
        >
          <CreateRequestDef />
        </div>
      )}
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
            <div className="col-10 pt-4">
              <Tab.Content>
                <Tab.Pane eventKey="requestMenu" className="vh-75">
                  <RequestDefsMenu></RequestDefsMenu>
                </Tab.Pane>
                <Tab.Pane eventKey="requestMade" className="vh-75">
                  <RequestsMade></RequestsMade>
                </Tab.Pane>
                <Tab.Pane eventKey="requestReceived" className="vh-75">
                  <RequestsReceived></RequestsReceived>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
      </main>
      <footer className="vh-25 overflow-scroll border-top">
        <h5>context state</h5>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </footer>
    </div>
  )
}

export default VirtualAssistant
