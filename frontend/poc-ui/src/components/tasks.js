import React, { useState, useEffect } from 'react';
import { ButtonGroup, DropdownButton, Dropdown, Modal } from 'react-bootstrap'
import CreateFormTask from './create-form-task'
import CreateApprovalTask from './create-approval-task'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { stateColor, formatDate } from '../libs/custom-functions'
import apiWrapper from '../libs/api-wrapper';

function Tasks ( { className, currentCaseId, userMessage, agentMessage } ) {
  const [ taskDefinitions, setTaskDefinitions] = useState([])
  const [ tasks, setTasks ] = useState([])
  const [ showFormTaskModal, setShowFormTaskModal ] = useState(false)
  const [ showApprovalTaskModal, setShowApprovalTaskModal ] = useState( false )
  const [ showWorkOnTaskModal, setShowWorkOnTaskModal ] = useState(false)
  const [ currentTask, setCurrentTask ] = useState({})

  function getCaseTasks () {
    const path = `/cases/${ currentCaseId }/tasks`;
    apiWrapper
      .get( path )
      .then( resp => {
        let caseTasks = resp.data;
        console.log( `Get tasks with currentCaseId=${ currentCaseId }: ${ caseTasks }` );
        setTasks( caseTasks );
      } )
      .catch( err => {
        console.error( err );
      } );
  }
  useEffect( () => {
      getCaseTasks();
  }, [ currentCaseId] )

  function closeTask () {
    setShowFormTaskModal( false )
  }

  function submitFormTask ({task}) {
    apiWrapper
      .post( '/tasks', task )
      .then( resp => {
        setTasks( tasks => [ task, ...tasks ] );
        agentMessage( <AfterPostMessage/> );
      } )
      .catch( err => {
        console.error( err );
      } )
      .then( () => {
        closeTask();
      } );
  }

  function workOnTask (task) {
    setShowWorkOnTaskModal( true )
    setCurrentTask( task )
    console.debug(JSON.stringify(task))
  }

  function completeCurrentTask () {
    // TODO: POST /cases/{currentCaseId}/tasks/{currentTaskId}/complete
    let path = `/case/${currentCaseId}/tasks/${currentTask.id}/complete`
    apiWrapper
      .patch( path )
      .then ( resp => {
        if ( resp.status !== 200)
          console.error(`something is wrong, ${resp.data}`)
      } )
      .catch( err => {
        console.error(err)
      })

    setShowWorkOnTaskModal( false );
  }

  return (
    <div className={className}>
      <div className="nav row mt-1">
        {tasks}
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
            let className = "btn btn-light btn-small mr-1 " + stateColor( task.state );
            return (
              <div className={className} key={task.id} onClick={e => { workOnTask(task); }}>
                {task.data.name}
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
          <CreateFormTask close={closeTask}
            taskDefinition={taskDefinitions[ 0 ]}
            submitFormTask={e => { debugger; submitFormTask( e ); }} />
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
            sendMessage={userMessage}
            agentMessage={agentMessage}
            setTasks={setTasks} />
        </Modal.Body>
      </Modal>
      <Modal show={showWorkOnTaskModal} onHide={e => setShowWorkOnTaskModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Working on task {currentTask.name}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <button className="btn-light" onClick={e => setShowWorkOnTaskModal( false )}>
            no change
          </button>
          <button className="btn-secondary" onClick={e => setShowWorkOnTaskModal( false )} disabled>
            cancel task
          </button>
          <button className="btn-success" onClick={completeCurrentTask}>
            complete task
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// TODO: this should come from backend, maybe use NLG to generate task reply, leave for future.
function AfterPostMessage ( { task } ) {
  if ( !task ) return '';

  const dueDate = formatDate( task.data.dueDate || new Date() );
  return (
    task &&
    <>
      Your task is added to current case.
        Your message is sent to <b>{task.data.assignee.name}</b>,
        expecting to finish on <b>{dueDate}</b>.
        I will inform him after <b>{task.data.followUpDays}</b> days if not finished.
      </>
  );
}

export default Tasks;