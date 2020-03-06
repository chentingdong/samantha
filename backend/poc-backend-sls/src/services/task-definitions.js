'use strict';
const apigatewayConnector = require('../connectors/apigateway');
const dynamodbConnector = require('../connectors/dynamodb');
const CONSTANTS = require('../constants');

const createTaskDefinition = async (event, context) => {  
  try {
    const data = JSON.parse(event.body);

    const result = await dynamodbConnector.createTaskDefinition(
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
    const errMsg = 'Unable to create task definition';
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

const getTaskDefinition = async (event, context) => {  
  try {
    const params = event.pathParameters;
    const id = params.id;
    // case is a keyword...
    const result = await dynamodbConnector.getTaskDefinition(
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
    const errMsg = 'Unable to get task definition';
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

const listTaskDefinitions = async (event, context) => {  
  try {
    const result = await dynamodbConnector.listTaskDefinitions();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN
      },
      body: JSON.stringify(result.Items)
    };
  } catch (err) {
    const errMsg = 'Unable to list task definitions';
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

const deleteTaskDefinition = async (event, context) => {  
  try {
    const params = event.pathParameters;
    const id = params.id;
    // case is a keyword...
    await dynamodbConnector.deleteTaskDefinition(
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
    const errMsg = 'Unable to delete task definition';
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
  createTaskDefinition,
  getTaskDefinition,
  listTaskDefinitions,
  deleteTaskDefinition
};
