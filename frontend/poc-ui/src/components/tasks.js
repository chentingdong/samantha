import React, { useState, useEffect } from 'react';
import { ButtonGroup, DropdownButton, Dropdown, Modal } from 'react-bootstrap'
import CreateFormTask from './create-form-task'
import CreateApprovalTask from './create-approval-task'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {textStateColorClassName} from '../libs/custom-functions'

function Tasks (props) {
  const [ showFormTaskModal, setShowFormTaskModal ] = useState(false)
  const [ showApprovalTaskModal, setShowApprovalTaskModal ] = useState( false )
  const [ tasks, setTasks ] = useState([])
  const [ showWorkOnTaskModal, setShowWorkOnTaskModal ] = useState(false)
  const currentCaseId = props.currentCaseId
  const [ currentTask, setCurrentTask ] = useState({})

  function findTasks ( ) {
    // TODO: GET /cases/{caseId}/tasks
    const resp = [
      {
        "id": "1",
        "name": "intake form",
        "dueDate": "2020/02/28",
        "followUpDuration": "1 day",
        "assignee": "baiji",
        "state": "active",
        "entryCreterias": []
      },
      {
        "id": "2",
        "name": "approval",
        "dueDate": "2020/02/28",
        "followUpDuration": "1 day",
        "assignee": "baiji",
        "state": "active",
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

    console.log(JSON.stringify(resp))
    setTasks(resp)
  }

  function workOnTask (task) {
    setShowWorkOnTaskModal( true )
    setCurrentTask( task )
    console.log(JSON.stringify(task))
  }

  function completeCurrentTask () {
    // TODO: POST /cases/{currentCaseId}/tasks/{currentTaskId}/complete
    const resp = { 'success': true }

    setCurrentTask( ( task ) => {
      task.state = 'complete';
      return task;
    } );

    setShowWorkOnTaskModal( false );
  }

  useEffect( () => {
    findTasks()
  }, [ currentCaseId] )

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
          {tasks.map( ( task ) => {
            let className = "btn btn-light btn-small mr-1 " + textStateColorClassName( task.state );

            return (
              <div className={className} key={task.name} onClick={e => { workOnTask(task); }}>
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
          <CreateFormTask
            close={e => setShowFormTaskModal( false )}
            sendMessage={props.userMessage}
            agentMessage={props.agentMessage}
            tasks={tasks}
            setTasks={setTasks} />
        </Modal.Body>
      </Modal>
      <Modal show={showApprovalTaskModal} onHide={e => setShowApprovalTaskModal( false )}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Create Approval Task</h3>
            <h6>create an addhoc task, add to current case, and assign to another person.</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateApprovalTask
            close={e => setShowApprovalTaskModal( false )}
            sendMessage={props.userMessage}
            agentMessage={props.agentMessage}
            setTasks={setTasks} />
        </Modal.Body>
      </Modal>
      <Modal show={showWorkOnTaskModal} onHide={e => setShowWorkOnTaskModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Work on task {currentTask.name}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <button className="btn-light" onClick={e => setShowWorkOnTaskModal( false )}>no change</button>
          <button className="btn-secondary" onClick={e => setShowWorkOnTaskModal( false )}>cancel task</button>
          <button className="btn-secondary" onClick={completeCurrentTask}>complete task</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tasks;