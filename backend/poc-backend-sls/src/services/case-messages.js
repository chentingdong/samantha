'use strict';
const apigatewayConnector = require('../connectors/apigateway');
const dynamodbConnector = require('../connectors/dynamodb');
const CONSTANTS = require('../constants');

const createCaseMessage = async (event, context) => {  
  try {
    const data = JSON.parse(event.body);

    const result = await dynamodbConnector.createCaseMessage(
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
    const errMsg = 'Unable to create case message';
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

const getCaseMessage = async (event, context) => {  
  try {
    const params = event.pathParameters;
    const id = params.id;
    // case is a keyword...
    const result = await dynamodbConnector.getCaseMessage(
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
    const errMsg = 'Unable to get case message';
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

const listCaseMessages = async (event, context) => {  
  try {
    const result = await dynamodbConnector.listCaseMessages();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN
      },
      body: JSON.stringify(result.Items)
    };
  } catch (err) {
    const errMsg = 'Unable to list case messages';
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

const deleteCaseMessage = async (event, context) => {  
  try {
    const params = event.pathParameters;
    const id = params.id;
    // case is a keyword...
    await dynamodbConnector.deleteCaseMessage(
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
    const errMsg = 'Unable to delete case message';
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
  createCaseMessage,
  getCaseMessage,
  listCaseMessages,
  deleteCaseMessage
};
