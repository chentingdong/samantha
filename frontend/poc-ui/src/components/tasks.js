import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import apiWrapper from '../libs/api-wrapper';
import NewTask from './create-task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { stateColor, formatDate, stateIcon } from '../libs/custom-functions';
import ProgressBar from 'react-bootstrap/ProgressBar';

function Tasks ( { currentCaseId, user } ) {
  const [ users, setUsers ] = useState( [] );
  const [ tasks, setTasks ] = useState( [] );
  const [ currentTask, setCurrentTask ] = useState( {} );
  const [ currentCase, setCurrentCase ] = useState( '' );
  const [ editTaskModal, setEditTaskModal ] = useState( false );
  const [ showWorkOnTaskModal, setShowWorkOnTaskModal ] = useState( false );
  const taskProgress = 60;

  useEffect( () => {
    apiWrapper.get( '/users' )
      .then( resp => {
        setUsers( resp.data );
      } );
  }, [] );

  useEffect( () => {
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
    getCaseTasks();
  }, [ currentCaseId ] );

  useEffect( () => {
    const path = '/cases/' + currentCaseId;
    apiWrapper
      .get( path )
      .then( resp => {
        if ( resp.data.data )
          setCurrentCase( resp.data.data );
      } )
      .catch( err => {
        console.error( err );
      } );
  }, [ currentCaseId ] );

  function getUserAttribute ( username, attr ) {
    try {
      let user = users.filter( u => { return u.username === username; } );
      if ( user.length === 1 )
        return user[ 0 ].attributes[ attr ];
    }
    catch ( err ) {
      console.error( 'Error getting user attribute: ', err );
    }
  }

  function editTask ( task ) {
    setEditTaskModal( true );
    setCurrentTask( task );
  }

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
    currentCase &&
    <div className="">
      <div className="row mt-2 p-2">
        <div className="col-2">
          <FontAwesomeIcon icon="angle-left" />
          <span className="pl-1">Back</span>
        </div>
        <h4 className="col-8 text-center">{ currentCase.name }</h4>
        <div className="col-2 text-right">
          <FontAwesomeIcon icon="info-circle" />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12">
          <h3 className="d-inline-block mr-2">{ currentCase.name }</h3>
          <FontAwesomeIcon className="text-primary border-bottom" icon="pen" />
        </div>
        <div className="col-12">
          Deadline: { formatDate( Date.now() ) }
        </div>
        <div className="col-5">
          { tasks.length } Tasks &#x2022;  { currentCase.participants.length } People
        </div>
        <div className="col-7">
          <ProgressBar className="" variant="light-gray" label={ `${ taskProgress }%` } now={ taskProgress } />
        </div>
      </div>
      <div className="card mt-4">
        <div className="d-flex pt-2 pb-2">
          <h4 className="col-6">Tasks</h4>
          <div className="col-6 text-right">
            <NewTask user={ user } users={ users } tasks={ tasks } setTasks={ setTasks } currentCaseId={ currentCaseId } />
          </div>
        </div>

        <table className="col-12 tasks">
          <tbody>
            <tr className="bg-light">
              <th className="p-2">Task title</th>
              <th>Due Date</th>
              <th>Assigned to</th>
              <th>Status</th>
            </tr>
            { tasks.length > 0 &&
              tasks.map( ( task ) => {
                const color = stateColor( task.state );
                return (
                  <tr key={ task.id } className="border-bottom border-light" >
                    <td className={ `p-2 pt-4 pb-4 clickable text-primary border-left border-${ color }` }
                      onClick={ e => editTask( task ) }
                    >
                      { task.data.name }
                    </td>
                    <td>
                      { formatDate( task.data.dueDate ) }
                    </td>
                    <td>
                      { task.data.participants &&
                        task.data.participants.map( participant => {
                          return (
                            <img className="thumbnail rounded-circle"
                              key={ task.data.participants.name }
                              src={ getUserAttribute( participant, 'picture' ) }
                              alt={ getUserAttribute( participant, 'name' ) } />
                          );
                        } )
                      }
                    </td>
                    <td className={ `border-right border-${ color }` }>
                      <div className={ `text-${ color } badge badge-pill border border-${ color } shadow-sm btn btn-light` }
                        onClick={ e => workOnTask( task ) }
                      >
                        <FontAwesomeIcon icon={ stateIcon( task.state ) } />
                        { task.state }
                      </div>
                    </td>
                  </tr>
                );
              } )
            }
          </tbody>
        </table>
      </div >
      <Modal show={ editTaskModal } onHide={ e => setEditTaskModal( false ) } >
        <Modal.Header closeButton>
          <Modal.Title>Edit task
             <b> { currentTask.data ? currentTask.data.name : JSON.stringify( currentTask.data ) }</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>
            { JSON.stringify( currentTask.data, null, 2 ) }
          </pre>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-light" onClick={ e => setEditTaskModal( false ) }>
            cancel
          </button>
          <button className="btn-light" onClick={ e => setEditTaskModal( false ) }>
            save
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={ showWorkOnTaskModal } onHide={ e => setShowWorkOnTaskModal( false ) }>
        <Modal.Header closeButton>
          <Modal.Title>
            <b> { currentTask.data ? currentTask.data.name : JSON.stringify( currentTask.data ) }</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Manually update the status of this task.</p>
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
    </div >
  );
};

export default Tasks;