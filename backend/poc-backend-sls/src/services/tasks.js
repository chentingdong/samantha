'use strict';
const apigatewayConnector = require('../connectors/apigateway');
const dynamodbConnector = require('../connectors/dynamodb');
const CONSTANTS = require('../constants');

const createTask = async (event, context) => {  
  try {
    const data = JSON.parse(event.body);

    const result = await dynamodbConnector.createTask(
      data
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN
      },
      body: JSON.stringify(data.Attributes)
    };
  } catch (err) {
    const errMsg = 'Unable to create task';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN
      },
      body: errMsg
    }
  }
};

const getTask = async (event, context) => {  
  try {
    const params = event.pathParameters;
    const id = params.id;
    // task is a keyword...
    const result = await dynamodbConnector.getTask(
      id
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN
      },
      body: JSON.stringify(result.Item)
    };
  } catch (err) {
    const errMsg = 'Unable to get task';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN
      },
      body: errMsg
    }
  }
};

const listTasks = async (event, context) => {  
  try {
    const result = await dynamodbConnector.listTasks();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN
      },
      body: JSON.stringify(result.Items)
    };
  } catch (err) {
    const errMsg = 'Unable to list tasks';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN
      },
      body: errMsg
    }
  }
};

const deleteTask = async (event, context) => {  
  try {
    const params = event.pathParameters;
    const id = params.id;
    // task is a keyword...
    await dynamodbConnector.deleteTask(
      id
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN
      },
      body: 'Deleted'
    };
  } catch (err) {
    const errMsg = 'Unable to delete task';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN
      },
      body: errMsg
    }
  }
};

module.exports = {
  createTask,
  getTask,
  listTasks,
  deleteTask
};
