"use strict";
const dynamodbConnector = require( "../connectors/dynamodb" );
const uuid = require( "uuid" );
const {
  taskCreateBroadcastToOwner,
  taskTransitionNoticeParticipants,
} = require( "./task-templates" );
const { addCaseParticipantToDb } = require( "./cases" );
const { eventEmitter } = require( "./events" );

module.exports.createTask = async ( event, context ) => {
  const id = uuid.v4();
  const state = "Pending";
  const { caseId } = event.path;
  const task = event.body;

  const { Item = {} } = await dynamodbConnector.getCase( caseId );
  const caseData = Item.data;

  // taskDependencyListener
  async function listenToDependentTask ( task ) {
    if ( task.dependsOns.length === 0 ) {
      task.state = "Active";
    } else {
      task.dependsOns.forEach( async ( dependOnTaskId ) => {
        const { dependOnTask = {} } = await dynamodbConnector.getTask(
          dependOnTaskId
        );
        eventEmitter.addListener( "taskComplete", function ( dependOnTask ) {
          taskTransitionNoticeParticipants(
            task.participants,
            dependOnTask,
            task
          );
          task.state = "Active";
        } );
      } );
    }
  }

  listenToDependentTask( task );

  // create task
  await dynamodbConnector.createTaskInCase( id, caseId, state, task );

  // add task to case planItems.
  caseData.planItems.push( {
    id,
    ...task,
  } );

  await dynamodbConnector.updateCaseData( caseId, caseData );

  // add participant to case participants
  await addCaseParticipantToDb( caseId, task.participants );

  // notification
  taskCreateBroadcastToOwner( caseId, task );
  return { id, state, caseId, data: task };
};

module.exports.getTask = async ( event, context ) => {
  const { taskId: id } = event.path;
  const { Item = {} } = await dynamodbConnector.getTask( id );
  return Item;
};

module.exports.listTasks = async ( event, context ) => {
  const { path: { caseId } = {} } = event;
  const { Items = [] } = caseId
    ? await dynamodbConnector.listTasksByCase( caseId )
    : await dynamodbConnector.listTasks();
  return Items;
};

module.exports.deleteTask = async ( event, context ) => {
  const { taskId: id } = event.path;
  await dynamodbConnector.deleteTask( id );
  return [];
};

module.exports.updateTaskState = async ( event, context ) => {
  const { taskId: id, state } = event.path;

  const { task = {} } = await dynamodbConnector.getTask( id );
  eventEmitter.emit( 'taskComplete', task );
  if ( task.state === 'Active' && state === 'Complete' ) {
    const state = 'Complete';
    await dynamodbConnector.updateTaskState( id, state );
  }
  else {
    await dynamodbConnector.updateTaskState( id, state );
  }

  return { id, state };
};
