'use strict';
const apigatewayConnector = require('../connectors/apigateway');
const dynamodbConnector = require('../connectors/dynamodb');
const CONSTANTS = require('../constants');

const createCaseDefinition = async (event, context) => {  
  try {
    const id = uuid.v4();
    const data = JSON.parse(event.body);

    const result = await dynamodbConnector.createCaseDefinition(
      id,
      data
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN
      },
      body: JSON.stringify({id})
    };
  } catch (err) {
    const errMsg = 'Unable to create case definition';
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

const getCaseDefinition = async (event, context) => {  
  try {
    const params = event.pathParameters;
    const id = params.id;
    // case is a keyword...
    const result = await dynamodbConnector.getCaseDefinition(
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
    const errMsg = 'Unable to get case definition';
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

const listCaseDefinitions = async (event, context) => {  
  try {
    const result = await dynamodbConnector.listCaseDefinitions();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN
      },
      body: JSON.stringify(result.Items)
    };
  } catch (err) {
    const errMsg = 'Unable to list case definitions';
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

const deleteCaseDefinition = async (event, context) => {  
  try {
    const params = event.pathParameters;
    const id = params.id;
    // case is a keyword...
    await dynamodbConnector.deleteCaseDefinition(
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
    const errMsg = 'Unable to delete case definition';
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
  createCaseDefinition,
  getCaseDefinition,
  listCaseDefinitions,
  deleteCaseDefinition
};
