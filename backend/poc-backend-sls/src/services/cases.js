'use strict';
const apigatewayConnector = require('../connectors/apigateway');
const dynamodbConnector = require('../connectors/dynamodb');
const CONSTANTS = require('../constants');

const createCase = async (event, context) => {  
  try {
    const data = JSON.parse(event.body);

    const result = await dynamodbConnector.createCase(
      data
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      },
      body: JSON.stringify(data.Attributes)
    };
  } catch (err) {
    const errMsg = 'Unable to create case';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      },
      body: JSON.stringify({errMsg})
    }
  }
};

const getCase = async (event, context) => {  
  try {
    const params = event.pathParameters;
    const id = params.id;
    // case is a keyword...
    const result = await dynamodbConnector.getCase(
      id
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      },
      body: JSON.stringify(result.Item)
    };
  } catch (err) {
    const errMsg = 'Unable to get case';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      },
      body: JSON.stringify({errMsg})
    }
  }
};

const listCases = async (event, context) => {  
  try {
    const result = await dynamodbConnector.listCases();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      },
      body: JSON.stringify(result.Items)
    };
  } catch (err) {
    const errMsg = 'Unable to list cases';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      },
      body: JSON.stringify({errMsg})
    }
  }
};

const deleteCase = async (event, context) => {  
  try {
    const params = event.pathParameters;
    const id = params.id;
    // case is a keyword...
    await dynamodbConnector.deleteCase(
      id
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      },
      body: 'Deleted'
    };
  } catch (err) {
    const errMsg = 'Unable to delete case';
    console.error(errMsg, err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      },
      body: JSON.stringify({errMsg})
    }
  }
};

module.exports = {
  createCase,
  getCase,
  listCases,
  deleteCase
};
