import React, { useState, useEffect } from 'react';
import { ButtonGroup, DropdownButton, Dropdown, Modal } from 'react-bootstrap';
import CreateFormTask from './create-form-task';
import CreateApprovalTask from './create-approval-task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { stateColor, formatDate } from '../libs/custom-functions';
import apiWrapper from '../libs/api-wrapper';

function Tasks ( { className, currentCaseId, agentMessage } ) {
  const [ taskDefinitions, setTaskDefinitions ] = useState( [] );
  const [ tasks, setTasks ] = useState( [] );
  const [ newTask, setNewTask ] = useState( {} );
  const [ currentTask, setCurrentTask ] = useState( {} );
  const [ showCreateModal, setShowCreateModal ] = useState( false );
  const [ showWorkOnTaskModal, setShowWorkOnTaskModal ] = useState( false );

  function getTaskDefinitions () {
    let path = '/task-definitions';
    apiWrapper
      .get( path )
      .then( resp => {
        setTaskDefinitions( resp.data );
      } )
      .catch( err => {
        console.error( err );
      } );
  }

  useEffect( () => {
    getTaskDefinitions();
  }, [] );

  function getCaseTasks () {
    let path = `/cases/${ currentCaseId }/tasks`;
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
  }, [ currentCaseId ] );

  function createTask ( taskDefinition ) {
    setShowCreateModal( true );
    setNewTask( {
      ...taskDefinition.data,
      dueDate: new Date()
    } );
  }

  function submitFormTask () {
    let path = `/cases/${ currentCaseId }/tasks`;
    apiWrapper
      .post( path, newTask )
      .then( resp => {
        setTasks( tasks => [ newTask, ...tasks ] );
        agentMessage( <AfterPostMessage /> );
      } )
      .catch( err => {
        console.error( err );
      } )
      .then( () => {
        closeTask();
      } );
  }

  function closeTask () {
    setShowCreateModal( false );
  }

  function getAssigneeList () {
    let assigneeList = [
      { name: 'Baiji', id: 'Baiji' },
      { name: 'Ben', id: 'Ben' },
      { name: 'Jin', id: 'Jin' },
      { name: 'Ronda', id: 'Ronda' },
      { name: 'Tingdong', id: 'Tingdong' }
    ];
    return assigneeList
  }
  getAssigneeList()

  function workOnTask ( task ) {
    setShowWorkOnTaskModal( true );
    setCurrentTask( task );
    console.debug( JSON.stringify( task ) );
  }

  function completeCurrentTask () {
    // TODO: POST /cases/{currentCaseId}/tasks/{currentTaskId}/complete
    let path = `/case/${ currentCaseId }/tasks/${ currentTask.id }/complete`;
    apiWrapper
      .patch( path )
      .then( resp => {
        if ( resp.status !== 200 )
          console.error( `something is wrong, ${ resp.data }` );
      } )
      .catch( err => {
        console.error( err );
      } );

    setShowWorkOnTaskModal( false );
  }

  return (
    <div className={className}>
      <div className="nav row mt-1">
        <DropdownButton
          as={ButtonGroup}
          variant="light"
          className="rounded-circle"
          size="sm"
          title={<FontAwesomeIcon icon="plus" />} >
          {
            taskDefinitions &&
            taskDefinitions.map( taskDefinition => {
              return (
                <Dropdown.Item eventKey="1"
                  onClick={e => createTask( taskDefinition )}
                  key={taskDefinition.id}>
                  <FontAwesomeIcon icon={taskDefinition.data.faIcon} />
                  <span> {taskDefinition.data.name}</span>
                </Dropdown.Item>
              );
            } )
          }
        </DropdownButton>
        <div className="ml-1">
          {
            tasks.map( ( task ) => {
              let className = "btn btn-light btn-small mr-1 " + stateColor( task.state );
              return (
                <div className={className} key={task.id} onClick={e => { workOnTask( task ); }}>
                  {task.data.name}
                </div>
              );
            } )
          }
        </div>
      </div >
      <Modal show={showCreateModal} onHide={closeTask} key={newTask.id}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>{newTask.name}</h3>
            <h6>{newTask.description}</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateFormTask
            newTask={newTask}
            setNewTask={setNewTask}
            close={closeTask}
            assigneeList={assigneeList}
            submitFormTask={submitFormTask} />
        </Modal.Body>
      </Modal>

      <Modal show={showWorkOnTaskModal} onHide={e => setShowWorkOnTaskModal( false )}>
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