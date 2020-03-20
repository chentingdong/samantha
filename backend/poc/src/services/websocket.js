'use strict';

const apigatewayConnector = require( '../connectors/apigateway' );
const dynamodbConnector = require( '../connectors/dynamodb' );
const CONSTANTS = require( '../constants' );

const handleSocketDefault = async ( event, context ) => {
  try {
    const data = JSON.parse( event.body );
    const action = data.action;

    const connectionId = event.requestContext.connectionId;
    switch ( action ) {
      case 'PING':
        const pingResponse = JSON.stringify( { action: 'PING', value: 'PONG' } );
        await apigatewayConnector.generateSocketMessage( connectionId, pingResponse );
        break;
      default:
        const invalidResponse = JSON.stringify( { action: 'ERROR', error: 'Invalid request' } );
        await apigatewayConnector.generateSocketMessage( connectionId, invalidResponse );
    }

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: 'Default socket response.'
    };
  } catch ( err ) {
    console.error( 'Unable to generate default response', err );
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: 'Default socket response error.'
    };
  }
};

const handleSocketConnect = async ( event, context ) => {
  try {

    // userId should be from Cognito
    const user = event.queryStringParameters.user;
    const userId = JSON.parse( user ).id;
    const connectionId = event.requestContext.connectionId;

    await dynamodbConnector.createSocket( connectionId, userId );

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: 'Socket successfully registered.'
    };
  } catch ( err ) {
    console.error( 'Unable to initialize socket connection', err );
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: 'Unable to register socket.'
    };
  }
};

const handleSocketDisconnect = async ( event, context ) => {
  try {
    const connectionId = event.requestContext.connectionId;

    await dynamodbConnector.deleteSocket( connectionId );

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: 'Socket successfully terminated.'
    };
  } catch ( err ) {
    console.error( 'Unable to terminate socket connection', err );
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: 'Unable to terminate socket.'
    };
  }
};

const crossDeviceBroadcast = async ( user, utterance ) => {
  const sockets = await dynamodbConnector.listSocketsByUser( user.id );
  const promises = [];
  sockets.Items.forEach( function ( item ) {
    const connectionId = item.connectionId;

    try {
      promises.push( apigatewayConnector.generateSocketMessage(
        connectionId,
        utterance
      ) );
    } catch ( err ) {
      console.error( `Unable to respond to ${ connectionId }`, err );
    }
  } );
  const results = await Promise.all( promises );
  console.debug( results );
};

const groupNotice = async ( users, utterance ) => {
  if ( users.length > 0 ) {
    try {
      users.map( (user) => {
        crossDeviceBroadcast( user.id, utterance )
      } )
      console.debug(`user notice sent: ${utterance}`)
    }
    catch ( err ) {
      console.error(`group notice failed, ${err}`)
    }
  }
}

module.exports = {
  handleSocketDefault,
  handleSocketConnect,
  handleSocketDisconnect,
  crossDeviceBroadcast,
  groupNotice
};
