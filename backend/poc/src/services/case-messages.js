'use strict';
const apigatewayConnector = require('../connectors/apigateway');
const dynamodbConnector = require('../connectors/dynamodb');
const CONSTANTS = require('../constants');
const uuid = require('uuid');

const createCaseMessage = async (event, context) => {
  try {
    const id = uuid.v4();
    const data = JSON.parse(event.body);

    await dynamodbConnector.createCaseMessage(
      id,
      data
    );

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify({id})
    };
  } catch (err) {
    const errMsg = 'Unable to create case message';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify({errMsg})
    }
  }
};

const getCaseMessages = async (event, context) => {
  try {
    const caseId = event.pathParameters.caseId;
    // case is a keyword...
    const result = await dynamodbConnector.listCaseMessages(
      caseId
    );

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify(result.Item)
    };
  } catch (err) {
    const errMsg = 'Unable to get case message';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify({err})
    }
  }
};

const listCaseMessages = async (event, context) => {
  try {
    var result = {};
    const params = event.pathParameters;
    if (params && 'caseId' in params) {
      result = await dynamodbConnector.listCaseMessagesByCase(params['caseId']);
    } else {
      result = await dynamodbConnector.listCaseMessages();
    }
    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify(result.Items)
    };
  } catch (err) {
    const errMsg = 'Unable to list case messages';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify({errMsg})
    }
  }
};

const deleteCaseMessage = async (event, context) => {
  try {
    const params = event.pathParameters;
    const id = params.caseMessageId;
    // case is a keyword...
    await dynamodbConnector.deleteCaseMessage(
      id
    );

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: 'Deleted'
    };
  } catch (err) {
    const errMsg = 'Unable to delete case message';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify({errMsg})
    }
  }
};

module.exports = {
  createCaseMessage,
  getCaseMessages,
  listCaseMessages,
  deleteCaseMessage
};