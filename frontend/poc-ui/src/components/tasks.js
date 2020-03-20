import React, { useState, useEffect } from 'react';
import { ButtonGroup, DropdownButton, Dropdown, Modal } from 'react-bootstrap';
import CreateTaskForm from './create-task-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { stateColor, formatDate } from '../libs/custom-functions';
import apiWrapper from '../libs/api-wrapper';
import { Auth } from 'aws-amplify';

function Tasks ( { currentCaseId } ) {
  const [ taskDefinitions, setTaskDefinitions ] = useState( [] );
  const [ tasks, setTasks ] = useState( [] );
  const [ newTask, setNewTask ] = useState( {} );
  const [ currentTask, setCurrentTask ] = useState( {} );
  const [ showCreateModal, setShowCreateModal ] = useState( false );
  const [ showWorkOnTaskModal, setShowWorkOnTaskModal ] = useState( false );
  const [ users, setUsers ] = useState( [] );

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
        // console.debug( `Got tasks\ncurrentCaseId=${ currentCaseId }: ${ JSON.stringify( caseTasks, null, 2 ) }` );
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
      owner: Auth.user,
      dueDate: new Date()
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

  function closeTask () {
    setShowCreateModal( false );
  }

  function getUsers () {
    // let users1 = [
    //   { name: 'Baiji', id: 'Baiji' },
    //   { name: 'Ben', id: 'Ben' },
    //   { name: 'Jin', id: 'Jin' },
    //   { name: 'Ronda', id: 'Ronda' },
    //   { name: 'Tingdong', id: 'Tingdong' }
    // ];
    let users2 = [
      {
        "IdentityId": "us-east-1:1d4915f3-cd7b-46dd-b477-8d7f3f66d4f6",
      },
      {
        "IdentityId": "us-east-1:6f36981e-cc6c-448d-aff0-72cacc2a10c9",
      },
      {
        "IdentityId": "us-east-1:7f632c70-1a02-4922-b0d3-dabf83b0fdc7",
      },
      {
        "IdentityId": "us-east-1:9418115c-5056-4855-929a-2fc7d2497ff6",
      },
      {
        "IdentityId": "us-east-1:b63a7951-7010-479d-9b0e-92155997ce99",
      }
    ];
    setUsers( users2 );

    /*     apiWrapper
          .get( '/users' )
          .then( resp => {
            setUsers( resp.data );
          })
        aws.config.update( {
          region: 'us-east-1',
          credentials: new aws.CognitoIdentityCredentials( {
            IdentityPoolId: 'us-east-1:e521146f-c326-4330-bd16-600e0ddf24dc'
          } )
        } );

        let cognitoidentity = new aws.CognitoIdentity();
        let params = {
          IdentityPoolId: 'us-east-1:e521146f-c326-4330-bd16-600e0ddf24dc',
          MaxResults: 50
        };

        cognitoidentity.listIdentities( params, ( err, data ) => {
          if ( err ) console.log( err, err.stack );
          else {
            console.log( data );
            let users = data.Identities;
            setUsers( users );
          }
        } ); */
  }
  useEffect( () => {
    getUsers();
  }, [] );

  function workOnTask ( task ) {
    setShowWorkOnTaskModal( true );
    setCurrentTask( task );
    console.debug( JSON.stringify( task ) );
  }

  function completeCurrentTask () {
    // User manually complete the task by clicking the complete button
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
    <div className="row mt-1">
      <div className="nav">
        <DropdownButton
          as={ ButtonGroup }
          variant="light"
          className="rounded-circle"
          size="sm"
          title={ <FontAwesomeIcon icon="plus" /> } >
          {
            taskDefinitions.length > 0 &&
            taskDefinitions.map( taskDefinition => {
              return (
                <Dropdown.Item eventKey="1"
                  onClick={ e => createTask( taskDefinition ) }
                  key={ taskDefinition.id }>
                  <FontAwesomeIcon icon={ taskDefinition.data.faIcon } />
                  <span> { taskDefinition.data.name }</span>
                </Dropdown.Item>
              );
            } )
          }
        </DropdownButton>
        <div className="ml-1">
          { tasks.length > 0 &&
            tasks.map( ( task ) => {
              let className = "btn btn-light btn-small mr-1 " + stateColor( task.state );
              return (
                <div className={ className } key={ task.id } onClick={ e => { workOnTask( task ); } }>
                  <FontAwesomeIcon icon="tasks" /> { task.name }
                </div>
              );
            } )
          }
        </div>
      </div >
      <Modal show={ showCreateModal } onHide={ closeTask } key={ newTask.id }>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>{ newTask.name }</h3>
            <h6>{ newTask.description }</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateTaskForm
            newTask={ newTask }
            close={ closeTask }
            users={ users }
            submitCreateTaskForm={ submitCreateTaskForm } />
        </Modal.Body>
      </Modal>
      <Modal show={ showWorkOnTaskModal } onHide={ e => setShowWorkOnTaskModal( false ) }>
        <Modal.Header closeButton>
          <Modal.Title>Working on task { currentTask.name }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>
            { JSON.stringify( currentTask.data, null, 2 ) }
          </pre>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-light" onClick={ e => setShowWorkOnTaskModal( false ) }>
            no change
          </button>
          <button className="btn-secondary" onClick={ e => setShowWorkOnTaskModal( false ) } disabled>
            cancel task
          </button>
          <button className="btn-success" onClick={ completeCurrentTask }>
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
  console.log( task );
  return (
    task &&
    <>
      Your task is added to current case.
      Your message is sent to <b>{ task.data.assignee }</b>,
      expecting to finish on <b>{ dueDate }</b>.
      I will inform him after <b>{ task.data.followUpDuration }</b> days if not finished.
    </>
  );
}

export default Tasks;