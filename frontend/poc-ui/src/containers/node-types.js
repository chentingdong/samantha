import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import keyboardDiagnose from '../assets/keyboard-diagnose.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

function NodeTypes (props) {
  const [ humanAgent, canTalkToHumanAgent ] = useState(false)

  return (
    <div class="container-fluid">
      <h2 className="text-center mt-4">Node Types</h2>
      <div className="row">
        <div className="col-6 mt-4">
          <Card className="">
            <Card.Header as="H5">
              <span>Send NDA request</span>
              <FontAwesomeIcon icon={faEye} className="clickable float-right" />
            </Card.Header>
            <Card.Body>
              <Form onSubmit="">
                <Form.Group>
                  <Form.Label>Send to email:</Form.Label>
                  <Form.Control as="input" value="an-employee@company"></Form.Control>
                  <Form.Label>Reply to email:</Form.Label>
                  <Form.Control as="input" value="" placeholder="info@company.com"></Form.Control>
                  <Form.Label>Email content</Form.Label>
                  <Form.Control as="textarea" rows="5" placeholder="please sign the attached NDA"></Form.Control>
                  <Form.Label> NDA forms names and urls to employee as attachment to user:</Form.Label>
                  <ul>
                    <li>
                      <Form.Label>Title</Form.Label>
                      <Form.Control as="input" value=""></Form.Control>
                      <Form.Label>Url</Form.Label>
                      <Form.Control as="input" value=""></Form.Control>
                    </li>
                    <li>
                      <Form.Label>Title</Form.Label>
                      <Form.Control as="input" value=""></Form.Control>
                      <Form.Label>Url</Form.Label>
                      <Form.Control as="input" value=""></Form.Control>
                    </li>
                  </ul>
                  <Button variant="primary">Save Node</Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </div>
        <div className="col-6 mt-4">
          <Card className="">
            <Card.Header>
              <span>NDA Request Status </span>
              <FontAwesomeIcon icon={faEye} className="clickable float-right" />
            </Card.Header>
            <Card.Body>
              <Card.Title>Automatically check NDA request through API calls</Card.Title>
              <Form onSubmit="">
                <Form.Group>
                  <Form.Label>RestAPI endpoint to check status (DocuSign)</Form.Label>
                  <Form.Control as="input" value="http://api.docusign.com/user_id/status"></Form.Control>
                  <Form.Label>RestAPI Method</Form.Label>
                  <Form.Control as="select">
                    <option>GET</option>
                    <option>POST</option>
                  </Form.Control>
                  <Form.Label>Request body</Form.Label>
                  <Form.Control as="textarea" rows="7">
                    If api method is post, payload data json goes here...
                  </Form.Control>
                </Form.Group>
                <hr />
                <Form.Group>
                  <Form.Label>Pretext</Form.Label>
                  <Form.Control as="input" placeholder="I just checked the system record, employee signed these NDA requests:"></Form.Control>
                  <Form.Label>Response Field Mapping</Form.Label>
                  <div class="row">
                    <div class="col">
                      <p>Field 1</p>
                      <p>Field 2</p>
                    </div>
                    <div class="col">
                      <Form.Control as="textarea" value="field 1" rows="5"></Form.Control>
                    </div>
                  </div>
                </Form.Group>
                <Button type="submit" variant="primary">Save Node</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
        <div className="col-6 mt-4">
          <Card className="">
            <Card.Header>
              <span>Hardware Diagnose Graph for Apple laptops</span>
              <FontAwesomeIcon icon={faEye} className="clickable float-right" />
            </Card.Header>
            <Card.Body>
              <Card.Text class="row">
                <p>We need to import the knowledge to a graph</p>
                <img className="img-fluid w-100" src={keyboardDiagnose} alt="keyboard diagnose tree" />
              </Card.Text>
              <Button variant="primary">Save Keyboard Diagnose Graph</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-6 mt-4">
          <Card className="">
            <Card.Header>
              <span>Order a Keyboard</span>
              <FontAwesomeIcon icon={faEye} className="clickable float-right" />
            </Card.Header>
            <Card.Body>
              <Form onSubmit="">
                <Form.Group>
                  <Form.Label>Pretext</Form.Label>
                  <Form.Control as="input" value="You can choose these keyboard to order automatically without approval:"></Form.Control>
                  <Form.Label>keyboard models (company policy, these models do not need approvement from manager.)</Form.Label>
                  <ul>
                    <li>
                      <Form.Label>Title</Form.Label>
                      <Form.Control as="input" value="Magic Keyboard - US English"></Form.Control>
                      <Form.Label>Url</Form.Label>
                      <Form.Control as="input" value="http://apple.com"></Form.Control>
                    </li>
                    <li>
                      <Form.Label>Title</Form.Label>
                      <Form.Control as="input" value="Magic Keyboard with Numeric Keypad - US English - Space Gray"></Form.Control>
                      <Form.Label>Url</Form.Label>
                      <Form.Control as="input" value="http://apple.com"></Form.Control>
                    </li>
                  </ul>
                  <Form.Label>Ask employee when does he/she want it.</Form.Label>
                  <p>
                    <DatePicker value="" />
                  </p>
                  <Form.Label>Talk to human?</Form.Label>
                  <Form.Check type="checkbox"
                    label="We can support employee to talk to a IT or HR agent."
                    onChange={e => { canTalkToHumanAgent(!e.target.value) }}>
                  </Form.Check>
                  {humanAgent &&
                    <Form.Group className="container">
                      <Form.Check label="Add user to IT agent queue"></Form.Check>
                      <Form.Check label="Add user to HR agent queue"></Form.Check>
                    </Form.Group>
                  }
                </Form.Group>
                <Button variant="primary">Save Node</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
        <div className="col-6 mt-4">
          <Card className="">
            <Card.Header>
              <span>Keyboard Order Status </span>
              <FontAwesomeIcon icon={faEye} className="clickable float-right" />
            </Card.Header>
            <Card.Body>
              <Card.Title>Automatically check Order status through API calls</Card.Title>
              <Form onSubmit="">
                <Form.Group>
                  <Form.Label>RestAPI endpoint to check status</Form.Label>
                  <Form.Control as="input" value="http://api.docusign.com/user_id/status"></Form.Control>
                  <Form.Label>RestAPI Method</Form.Label>
                  <Form.Control as="select">
                    <option>GET</option>
                    <option>POST</option>
                  </Form.Control>
                  <Form.Label>Request body</Form.Label>
                  <Form.Control as="textarea" rows="7">
                    If api method is post, payload data json goes here...
                  </Form.Control>
                </Form.Group>
                <hr />
                <Form.Group>
                  <Form.Label>Pretext</Form.Label>
                  <Form.Control as="input" placeholder="I just checked the system record, employee signed these NDA requests:"></Form.Control>
                  <Form.Label>Response Field Mapping</Form.Label>
                  <div class="row">
                    <div class="col">
                      <p>Field 1</p>
                      <p>Field 2</p>
                    </div>
                    <div class="col">
                      <Form.Control as="textarea" value="field 1" rows="5"></Form.Control>
                    </div>
                  </div>
                </Form.Group>
                <Button type="submit" variant="primary">Save Node</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NodeTypes;