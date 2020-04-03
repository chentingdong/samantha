import React, { useState, useEffect } from 'react';
import { Dropdown, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import apiWrapper from '../libs/api-wrapper';
import CreateTaskContent from './create-task-content';

/**
* @author tchen@bellhop.io
* @function NewTask
**/

const NewTask = ( { tasks, setTasks, currentCaseId, user, users } ) => {
  const [ taskDefinitions, setTaskDefinitions ] = useState( [] );
  const [ newTask, setNewTask ] = useState( {} );
  const [ showCreateModal, setShowCreateModal ] = useState( false );

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

  function submitCreateTaskForm ( task ) {
    let path = `/cases/${ currentCaseId }/tasks`;
    apiWrapper
      .post( path, task )
      .then( resp => {
        let t = resp.data;

        setTasks( tasks => [ t, ...tasks ] );
      } )
      .catch( err => {
        console.error( err );
      } )
      .then( () => {
        closeTask();
      } );
  }

  function createTask ( taskDefinition ) {
    setShowCreateModal( true );
    setNewTask( {
      ...taskDefinition.data,
      owner: user.username,
      dueDate: new Date()
    } );
  }

  function closeTask () {
    setShowCreateModal( false );
  }

  useEffect( () => {
    getTaskDefinitions();
  }, [] );

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle
          // @ts-ignore
          variant="light border-secondary shadow-sm">
          <FontAwesomeIcon icon="plus-circle" />
          <span className="ml-1">New Task</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            taskDefinitions.length > 0 &&
            taskDefinitions.map( taskDefinition => {
              return (
                <Dropdown.Item eventKey="1"
                  key={ taskDefinition.id }
                  onClick={ e => createTask( taskDefinition ) }
                >
                  <FontAwesomeIcon icon={ taskDefinition.data.icon || 'cog' } />
                  <span> { taskDefinition.data.name }</span>
                </Dropdown.Item>
              );
            } )
          }
        </Dropdown.Menu>
      </Dropdown>
      <Modal className="container-fluid"
        show={ showCreateModal }
        onHide={ closeTask }
        key={ newTask.id }>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>{ newTask.name }</h3>
            <h6>{ newTask.description }</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateTaskContent
            user={ user }
            users={ users }
            tasks={ tasks }
            newTask={ newTask }
            close={ closeTask }
            submitCreateTaskForm={ submitCreateTaskForm } />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewTask;