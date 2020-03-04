import React, { useState } from 'react';
import { ButtonGroup, Button, Modal } from 'react-bootstrap'
import CreateHumanTaskForm from './create-form-task'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function RuntimeTools (props) {
  const [ showHumanTaskModal, setshowHumanTaskModal ] = useState(false)

  function newHumanTask () {
    console.log('popup new human task layer')
    setshowHumanTaskModal(true)
  }

  function closeHumanTask () {
    setshowHumanTaskModal(false)
  }

  function newProcessTask () {
    console.log('popup new process task layer')
  }

  function newCaseTask () {
    console.log('popup new case task layer')
  }

  return (
    <div className={props.className}>
      <div className="nav row mt-1">
        <ButtonGroup aria-label="Basic example">
          <Button variant="light" onClick={newHumanTask}>
            <FontAwesomeIcon icon="user-cog" />
          </Button>
          <Button variant="light" onClick={newProcessTask} disabled>
            <FontAwesomeIcon icon="project-diagram" />
          </Button>
          <Button variant="light" onClick={newCaseTask} disabled>
            <FontAwesomeIcon icon="robot" />
          </Button>
        </ButtonGroup>
      </div >
      <Modal show={showHumanTaskModal} onHide={closeHumanTask}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Create Human Task</h3>
            <h6>create an addhoc task, add to current case, and assign to another person.</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateHumanTaskForm close={closeHumanTask} sendMessage={props.userMessage} agentMessage={props.agentMessage} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RuntimeTools;