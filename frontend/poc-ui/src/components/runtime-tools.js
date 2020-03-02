import React, { useState } from 'react';
import { ButtonGroup, Button, Modal, Form } from 'react-bootstrap'
import CreateHumanTaskForm from './create-human-task'

function RuntimeTools (props) {
  const [ showHumanTaskModal, setshowHumanTaskModal ] = useState(false)

  function newHumanTask () {
    console.log('popup new human task layer')
    setshowHumanTaskModal(true)
  }

  function cancelHumanTask () {
    setshowHumanTaskModal(false)
  }

  function newProcessTask () {
    console.log('popup new process task layer')
  }

  function newCaseTask () {
    console.log('popup new case task layer')
  }

  return (
    <>
      <div className="runtime-tools row">
        <div className="btn">Create new </div>
        <ButtonGroup aria-label="Basic example">
          <Button variant="light" onClick={newHumanTask}>human task</Button>
          <Button variant="light" onClick={newProcessTask} disabled>process task</Button>
          <Button variant="light" onClick={newCaseTask} disabled>case task</Button>
        </ButtonGroup>
      </div >
      <Modal show={showHumanTaskModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Human Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateHumanTaskForm close={cancelHumanTask} sendMessage={props.userMessage} agentMessage={props.agentMessage}/>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RuntimeTools;