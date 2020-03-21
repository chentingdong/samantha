import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import apiWrapper from '../libs/api-wrapper';
import NewTask from './new-task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { stateColor, formatDate } from '../libs/custom-functions';
import './tasks.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

function Tasks ( { currentCaseId } ) {
  const [ tasks, setTasks ] = useState( [] );
  const [ currentTask, setCurrentTask ] = useState( {} );
  const [ showWorkOnTaskModal, setShowWorkOnTaskModal ] = useState( false );
  const [ users, setUsers ] = useState( [] );
  const taskProgress = 60;

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
    <div className="">
      <div className="row mt-2 p-2">
        <div className="col-2">
          <FontAwesomeIcon icon="angle-left" />
          <span className="pl-1">Back</span>
        </div>
        <div className="col-8 text-center">{ currentCaseId }</div>
        <div className="col-2 text-right">
          <FontAwesomeIcon icon="info-circle" />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12">
          <h2 className="d-inline-block mr-2">Stage 0</h2>
          <FontAwesomeIcon icon="pen" />
        </div>
        <div className="col-12">
          Deadline: { formatDate( Date.now() ) }
        </div>
        <div className="col-5">
          n Tasks * m People
        </div>
        <div className="col-7">
          <ProgressBar className="" variant="secondary" label={ `${ taskProgress }%` } now={ taskProgress } />
        </div>
      </div>
      <div className="card mt-4">
        <div className="d-flex pt-2 pb-2">
          <h2 className="col-6">Tasks</h2>
          <div className="col-6 text-right">
            <NewTask users={ users } tasks={ tasks } setTasks={ setTasks } />
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
                let cn = 'task-status ' + stateColor( task.state );
                return (
                  <tr key={ task.id }>
                    <td className="p-2 clickable text-primary" onClick={ e => workOnTask( task ) }>{ task.data.name }</td>
                    <td>{ formatDate( task.data.dueDate ) }</td>
                    <td>
                      <img className="thumbnail" src={ task.data.owner.picture } alt={ task.data.owner.name } />
                    </td>
                    <td>
                      <div className={ cn } >{ task.state } </div>
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