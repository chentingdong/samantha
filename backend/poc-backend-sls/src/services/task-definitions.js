'use strict';
const apigatewayConnector = require('../connectors/apigateway');
const dynamodbConnector = require('../connectors/dynamodb');
const CONSTANTS = require('../constants');
const uuid = require('uuid');

const createTaskDefinition = async (event, context) => {  
  try {
    const id = uuid.v4();
    const data = JSON.parse(event.body);

    await dynamodbConnector.createTaskDefinition(
      id,
      data
    );

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify({id})
    };
  } catch (err) {
    const errMsg = 'Unable to create task definition';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify({errMsg})
    }
  }
};

const getTaskDefinition = async (event, context) => {  
  try {
    const params = event.pathParameters;
    const id = params.taskDefinitionId;
    // case is a keyword...
    const result = await dynamodbConnector.getTaskDefinition(
      id
    );

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify(result.Item)
    };
  } catch (err) {
    const errMsg = 'Unable to get task definition';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify({errMsg})
    }
  }
};

const listTaskDefinitions = async (event, context) => {  
  try {
    const result = await dynamodbConnector.listTaskDefinitions();

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify(result.Items)
    };
  } catch (err) {
    const errMsg = 'Unable to list task definitions';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify({errMsg})
    }
  }
};

const deleteTaskDefinition = async (event, context) => {  
  try {
    const params = event.pathParameters;
    const id = params.taskDefinitionId;
    // case is a keyword...
    await dynamodbConnector.deleteTaskDefinition(
      id
    );

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: 'Deleted'
    };
  } catch (err) {
    const errMsg = 'Unable to delete task definition';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify({errMsg})
    }
  }
};

module.exports = {
  createTaskDefinition,
  getTaskDefinition,
  listTaskDefinitions,
  deleteTaskDefinition
};
