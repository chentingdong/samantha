import React, { useState, useEffect } from 'react';
import { ButtonGroup, Button,DropdownButton, Dropdown, Modal } from 'react-bootstrap'
import CreateFormTaskForm from './create-form-task'
import CreateApprovalTaskForm from './create-approval-task'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Tasks (props) {
  const [ showFormTaskModal, setShowFormTaskModal ] = useState(false)
  const [ showApprovalTaskModal, setShowApprovalTaskModal ] = useState( false )
  const caseId = props.currentCaseId
  const [ tasks, setTasks ] = useState([])

  function findTasks ( ) {
    // TODO: GET /cases/{caseId}/tasks
    const resp = [
      {
        "id": "1",
        "name": "choose form",
        "type": "human task",
        "dueDate": "2020/02/28",
        "followUpDuration": "1 day",
        "assignment": "employee group 1",
        "state": "todo||active||canceled||completed",
        "forms": [
          "form1.html",
          "form2.html"
        ]
      },
      {
        "id": "2",
        "name": "approval",
        "type": "human task",
        "assignment": "employee group 2",
        "state": "todo||active||canceled||completed",
        "entryCriterions": [
          {
            "onParts": [ {
              "planItemId": "1",
              "state": "complete"
            } ],
            "ifPart": "{{expression}}"
          }
        ]
      }
    ]

    console.log(resp)
    setTasks(resp)
  }

  useEffect( () => {
    findTasks()
  }, [caseId] )

  return (
    <div className={props.className}>
      <div className="nav row mt-1">
        <DropdownButton
          as={ButtonGroup}
          variant="light"
          className="rounded-circle"
          size="sm"
          title={<FontAwesomeIcon icon="plus" />}
          id="bg-nested-dropdown">
          <Dropdown.Item eventKey="1" onClick={e => setShowFormTaskModal( true )}>
            <FontAwesomeIcon icon="user-cog" />
            <span> Form Task</span>
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={e => setShowApprovalTaskModal( true )}>
            <FontAwesomeIcon icon="project-diagram" />
            <span> Approval Task</span>
          </Dropdown.Item>
        </DropdownButton>
      <div className="ml-1">
        {tasks.map( (task) => {
          return (
            <div className="btn btn-light btn-small mr-1" key={task.id}>
              {task.name}
            </div>
          )
        })}
      </div>
      </div >
      <Modal show={showFormTaskModal} onHide={e => setShowFormTaskModal( false )}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Create Form Task</h3>
            <h6>create an addhoc task, add to current case, and assign to another person.</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateFormTaskForm close={e => setShowFormTaskModal( false )} sendMessage={props.userMessage} agentMessage={props.agentMessage} />
        </Modal.Body>
      </Modal>
      <Modal show={showApprovalTaskModal} onHide={e => setShowApprovalTaskModal( false )}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Create Human Task</h3>
            <h6>create an addhoc task, add to current case, and assign to another person.</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateApprovalTaskForm close={e => setShowApprovalTaskModal( false )} sendMessage={props.userMessage} agentMessage={props.agentMessage} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Tasks;