'use strict';
const dynamodbConnector = require('../connectors/dynamodb');
const CONSTANTS = require('../constants');
const uuid = require('uuid');
const { taskResponseToOwner } = require('./task-templates')

const createTask = async (event, context) => {
  try {
    const id = uuid.v4();
    const state = 'Active';
    const params = event.pathParameters;
    const caseId = params.caseId;
    const task = JSON.parse(event.body);

    const caseItem = await dynamodbConnector.getCase(
      caseId
    );
    const caseData = caseItem.Item.data;

    await dynamodbConnector.createTaskInCase(
      id,
      caseId,
      state,
      task
    );

    caseData.planItems.push({
      id,
      ...task
    });

    await dynamodbConnector.updateCaseData(
      caseId,
      caseData
    );

    taskResponseToOwner( { caseId, task } )

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify({id, state, caseId, task})
    };
  } catch (err) {
    const errMsg = 'Unable to create task';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify({errMsg})
    }
  }
};

const getTask = async (event, context) => {
  try {
    const params = event.pathParameters;
    const id = params.taskId;
    // task is a keyword...
    const result = await dynamodbConnector.getTask(
      id
    );

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify(result.Item)
    };
  } catch (err) {
    const errMsg = 'Unable to get task';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify({errMsg})
    }
  }
};

const listTasks = async (event, context) => {
  try {
    var result = {};
    const params = event.pathParameters;
    if (params && 'caseId' in params) {
      result = await dynamodbConnector.listTasksByCase(params.caseId);
    } else {
      result = await dynamodbConnector.listTasks();
    }

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify(result.Items)
    };
  } catch (err) {
    const errMsg = 'Unable to list tasks';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify({errMsg})
    }
  }
};

const completeTask = async (event, context) => {
  try {
    const params = event.pathParameters;
    const id = params.taskId;
    const state = 'Complete';

    await dynamodbConnector.updateTaskState(
      id,
      state
    );

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify({id, state})
    };
  } catch (err) {
    const errMsg = 'Unable to complete task';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify({errMsg})
    }
  }
};

const deleteTask = async (event, context) => {
  try {
    const params = event.pathParameters;
    const id = params.taskId;
    // task is a keyword...
    await dynamodbConnector.deleteTask(
      id
    );

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: 'Deleted'
    };
  } catch (err) {
    const errMsg = 'Unable to delete task';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify({errMsg})
    }
  }
};

module.exports = {
  createTask,
  getTask,
  listTasks,
  completeTask,
  deleteTask
};
