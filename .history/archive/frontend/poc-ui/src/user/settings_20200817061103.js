import React from "react";
import { Tab, Nav, Row, Col } from "react-bootstrap";
import ChangePassword from "./change-password";

function Settings(props) {
  return (
    <div className="container mt-4">
      <Tab.Container id="left-tabs-example" defaultActiveKey="password">
        <Row className="row">
          <Col sm={4}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="password">password</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="email">email</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="phoneNumber">phone number</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="username">username</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="givenName">given name</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="middleName">middle name</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="familyName">family name</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="picture">picture</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="gender">gender</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={8} className="container">
            <Tab.Content>
              <Tab.Pane eventKey="password">
                <ChangePassword props={props} />
              </Tab.Pane>
              <Tab.Pane eventKey="email">TODO: change email form</Tab.Pane>
              <Tab.Pane eventKey="phoneNumber">
                TODO: change phone number form
              </Tab.Pane>
              <Tab.Pane eventKey="username">
                TODO: change username form
              </Tab.Pane>
              <Tab.Pane eventKey="givenName">
                TODO: change first name form
              </Tab.Pane>
              <Tab.Pane eventKey="middleName">
                TODO: change middle name form
              </Tab.Pane>
              <Tab.Pane eventKey="familyName">
                TODO: change last name form
              </Tab.Pane>
              <Tab.Pane eventKey="picture">TODO: change picture form</Tab.Pane>
              <Tab.Pane eventKey="gender">TODO: change gender form</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default Settings;
