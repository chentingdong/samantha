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
  const [ currentCaseName, setCurrentCaseName ] = useState( '' );
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
          setCurrentCaseName( resp.data.data.name );
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
    <div className="">
      <div className="row mt-2 p-2">
        <div className="col-2">
          <FontAwesomeIcon icon="angle-left" />
          <span className="pl-1">Back</span>
        </div>
        <h4 className="col-8 text-center">{ currentCaseName }</h4>
        <div className="col-2 text-right">
          <FontAwesomeIcon icon="info-circle" />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12">
          <h3 className="d-inline-block mr-2">Stage 0</h3>
          <FontAwesomeIcon className="text-primary border-bottom" icon="pen" />
        </div>
        <div className="col-12">
          Deadline: { formatDate( Date.now() ) }
        </div>
        <div className="col-5">
          { tasks.length } Tasks &#x2022; 2 People
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
                      onClick={ e => workOnTask( task ) }>
                      { task.data.name }
                    </td>
                    <td>
                      { formatDate( task.data.dueDate ) }
                    </td>
                    <td>
                      {/* TODO: use assignee not owner */ }
                      <img className="thumbnail rounded-circle" src={ getUserAttribute( task.data.assignee, 'picture' ) } alt={ getUserAttribute( task.data.assignee, 'name' ) } />
                    </td>
                    <td className={ `border-right border-${ color }` }>
                      <div className={ `text-${ color } badge badge-pill border border-${ color } shadow-sm` } >
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
    </div >
  );
};

export default Tasks;