'use strict';
const dynamodbConnector = require( '../connectors/dynamodb' );
const uuid = require( 'uuid' );
const { taskBroadcastToOwner } = require( './task-templates' );
const { addCaseParticipantToDb } = require( './cases' );

module.exports.createTask = async ( event, context ) => {
  const id = uuid.v4();
  const state = 'Active';
  const { caseId } = event.path;
  const task = event.body;

  const { Item = {} } = await dynamodbConnector.getCase( caseId );
  const caseData = Item.data;

  // create task
  await dynamodbConnector.createTaskInCase(
    id,
    caseId,
    state,
    task
  );

  // add task to case planItems.
  caseData.planItems.push( {
    id,
    ...task
  } );

  await dynamodbConnector.updateCaseData(
    caseId,
    caseData
  );

  // add par to case participant
  await addCaseParticipantToDb( caseId, task.participants );

  // notification
  taskBroadcastToOwner( caseId, task );
  task;
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

module.exports.completeTask = async ( event, context ) => {
  const { taskId: id } = event.path;
  const state = 'Complete';
  await dynamodbConnector.updateTaskState( id, state );
  return { id, state };
};
