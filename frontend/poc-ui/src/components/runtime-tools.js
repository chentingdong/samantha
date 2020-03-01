import React, { useState } from 'react';
import { ButtonGroup, Button, Modal, Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { useFormFields } from '../libs/custom-hooks'

function RuntimeTools (props) {
  const [ showHumanTaskModal, setshowHumanTaskModal ] = useState(true)

  const [ humanTaskForm, setHumanTaskForm ] = useFormFields({
    taskDescription: 'Please fill in this form...',
    assignmentGroup: 'Ronda',
    dueDate: new Date(),
    followupDays: 1
  })

  function newHumanTask () {
    console.log('popup new human task layer')
    setshowHumanTaskModal(true)
  }

  function trackHumanTask () {
    console.log('TODO: post human task form to backend...')

    setshowHumanTaskModal(false)
  }

  function cancelHumanTask () {
    console.log('add human task to current case and close the modal')
    setshowHumanTaskModal(false)
  }

  function HumanTaskModal () {
    return (
      <Modal show={showHumanTaskModal} onHide={cancelHumanTask}>
        <Modal.Header closeButton>
          <Modal.Title>Add human task</Modal.Title>
        </Modal.Header>
        <Form onSubmit={trackHumanTask}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Task description to assignee</Form.Label>
              <Form.Control as="textarea" value={humanTaskForm.taskDescription} onChange={(e) => setHumanTaskForm(e)}/>
            </Form.Group>
            <hr />
            <Form.Group>
              <Form.Label>Assignment</Form.Label>
              <Form.Control as="select">
                <option>Baiji</option>
                <option>Jin</option>
                <option>Ronda</option>
                <option>Tingdong</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Due date</Form.Label><br />
              <DatePicker selected={humanTaskForm.dueDate} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Followup after how many days</Form.Label><br />
              <Form.Control as="input" type="number" name="followupDays" value={humanTaskForm.followupDays} onChange={setHumanTaskForm} />
            </Form.Group>
            <hr />
            <Form.Group>
              <Form.Label>Attach form (optional)</Form.Label>
              <Form.Control as="select" select={humanTaskForm.attachedForms} onChange={setHumanTaskForm}>
                <option>form_1</option>
                <option>form_2</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelHumanTask}>
              Cancel
            </Button>
            <Button variant="primary" onClick={trackHumanTask}>
              Add and track task
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }

  function newProcessTask () {
    console.log('popup new process task layer')
  }

  function newCaseTask () {
    console.log('popup new case task layer')
  }

  return (
    <div className="runtime-tools row">
      <ButtonGroup aria-label="Basic example">
        <Button variant="light" onClick={newHumanTask}>human task</Button>
        <Button variant="light" onClick={newProcessTask} disabled>process task</Button>
        <Button variant="light" onClick={newCaseTask} disabled>case task</Button>
      </ButtonGroup>
      <HumanTaskModal />
    </div >
  );
};

export default RuntimeTools;