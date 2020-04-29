import * as React from 'react'
import { Tab, Nav, Row, Col } from 'react-bootstrap'
import requestDefs from '../../../data/requestDefs.json'
import FormBuilder from 'react-form-builder2'

function VirtualAssistant() {
  return (
    <div className="container-fluid">
      <Tab.Container id="left-tabs-example" defaultActiveKey="requestMenu">
        <div className="row">
          <div className="col-2 mt-4">
            <Nav variant="none" className="flex-column">
              <Nav.Item className="mt-2 btn btn-light">
                <Nav.Link eventKey="requestMenu">requestMenu</Nav.Link>
              </Nav.Item>
              <Nav.Item className="mt-2 btn btn-light">
                <Nav.Link eventKey="requestMade">requestMade</Nav.Link>
              </Nav.Item>
              <Nav.Item className="mt-2 btn btn-light">
                <Nav.Link eventKey="requestReceived">requestReceived</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="col-10">
            <Tab.Content>
              <Tab.Pane eventKey="requestMenu">
                <RequestDefMenu></RequestDefMenu>
              </Tab.Pane>
              <Tab.Pane eventKey="requestMade">
                <RequestMade></RequestMade>
              </Tab.Pane>
              <Tab.Pane eventKey="requestReceived">
                <RequestReceived></RequestReceived>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </div>
  )
}

function RequestDefMenu() {
  return (
    <div className="vh-100">
      <a href="#" className="float-right">
        Add Request to Menu
      </a>
      <h1 className="mt-4 mb-4">Request Menu</h1>
      {requestDefs.map((requestDef, index) => {
        return (
          <div key={`request-${index}`} className="card mt-2">
            <h3>{requestDef.name}</h3>
            <p>{requestDef.description}</p>
          </div>
        )
      })}
      <FormBuilder.ReactFormBuilder />
    </div>
  )
}

function CreateRequestDef() {}

function RequestMade() {
  return (
    <div>
      <h2>Request Made</h2>
    </div>
  )
}

function RequestReceived() {
  return (
    <div>
      <h2>Request Received</h2>
    </div>
  )
}

function BlockPalette() {
  return (
    <div className="vh-100">
      <h3>Block Palette</h3>
    </div>
  )
}
export default VirtualAssistant
