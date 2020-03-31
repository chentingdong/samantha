'use strict';
const apigatewayConnector = require( '../connectors/apigateway' );
const dynamodbConnector = require( '../connectors/dynamodb' );
const CONSTANTS = require( '../constants' );
const uuid = require( 'uuid' );

const createCase = async ( event, context ) => {
  try {
    const id = uuid.v4();
    const state = 'Active';
    const data = JSON.parse( event.body );

    await dynamodbConnector.createCase(
      id,
      state,
      data
    );

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify( { id, state, data } )
    };
  } catch ( err ) {
    const errMsg = 'Unable to create case';
    console.error( errMsg, err );
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify( { errMsg } )
    };
  }
};

const getCase = async ( event, context ) => {
  try {
    const params = event.pathParameters;
    const id = params.caseId;
    // case is a keyword...
    const result = await dynamodbConnector.getCase(
      id
    );

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify( result.Item )
    };
  } catch ( err ) {
    const errMsg = 'Unable to get case';
    console.error( errMsg, err );
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify( { errMsg } )
    };
  }
};

const listCases = async ( event, context ) => {
  try {
    const result = await dynamodbConnector.listCases();

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify( result.Items )
    };
  } catch ( err ) {
    const errMsg = 'Unable to list cases';
    console.error( errMsg, err );
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify( { errMsg } )
    };
  }
};

const addCaseParticipant = async ( event, context ) => {
  try {
    const params = event.pathParameters;
    const id = params.caseId;
    const username = params.username;
    const caseInstance = await dynamodbConnector.getCase( id );
    const participants = 'participants' in caseInstance ? caseInstance[ 'participants' ] : [];
    participants.push( username );
    caseInstance[ 'participants' ] = participants;
    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify( caseInstance )
    };
  }
  catch ( err ) {
    const errMsg = `Unable to add case paticipant: ${ err }`;
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify( { errMsg } )
    };
  }
};

const completeCase = async ( event, context ) => {
  try {
    const params = event.pathParameters;
    const id = params.caseId;
    const state = 'Complete';

    await dynamodbConnector.updateCaseState(
      id,
      state
    );

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify( { id, state } )
    };
  } catch ( err ) {
    const errMsg = 'Unable to complete case';
    console.error( errMsg, err );
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify( { errMsg } )
    };
  }
};

const deleteCase = async ( event, context ) => {
  try {
    const params = event.pathParameters;
    const id = params.caseId;
    // case is a keyword...
    await dynamodbConnector.deleteCase(
      id
    );

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: 'Deleted'
    };
  } catch ( err ) {
    const errMsg = 'Unable to delete case';
    console.error( errMsg, err );
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify( { errMsg } )
    };
  }
};

module.exports = {
  createCase,
  getCase,
  listCases,
  addCaseParticipant,
  completeCase,
  deleteCase
};
