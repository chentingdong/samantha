// 'use strict';

// const apigatewayConnector = require( '../connectors/apigateway' );
// const dynamodbConnector = require( '../connectors/dynamodb' );
// const CONSTANTS = require( '../constants' );
// const uuidv4 = require( 'uuid/v4' );

// const handleSocketInteraction = async ( event, context ) => {
//   try {
//     // userId should be from Cognito
//     const userId = '123';

//     const connectionId = event.requestContext.connectionId;

//     // Retrieve the message from the socket payload
//     const data = JSON.parse( event.body );
//     const taskData = data.task;
//     const taskId = uuidv4();
//     try {
//       await dynamodbConnector.createTask(
//         taskId,
//         userId,
//         taskData
//       );
//     } catch ( err ) {
//       console.error( `Unable to add task ${ taskData }`, err );
//     }

//     // write to message queue
//     try {
//       await dynamodbConnector.createCaseMessage( {
//         id: messageId,
//         caseId: event.caseId,
//         data: event.message
//       } );
//     }
//     catch ( err ) {
//       console.error( `Unable to add case message: ${ message }` );
//     }

//     // response to user
//     const responseMessage = {
//       body: {
//         utterance: `Working on ${ taskData }. TaskId: ${ taskId }`
//       }
//     };

//     try {
//       await apigatewayConnector.generateSocketMessage(
//         connectionId,
//         JSON.stringify( responseMessage )
//       );
//     } catch ( err ) {
//       console.error( `Unable to respond to ${ connectionId }`, err );
//     }

//     // Let the API Gateway Websocket know everything went OK.
//     return {
//       statusCode: 200,
//       headers: CONSTANTS.RESPONSE_HEADERS,
//       body: 'Success.'
//     };
//   } catch ( err ) {
//     // Notify API Gateway Websocket in case of error, also log it on
//     // CloudWatch
//     console.error( 'Unable to handle interaction', err );
//     return {
//       statusCode: 500,
//       headers: CONSTANTS.RESPONSE_HEADERS,
//       body: 'Unable to handle interaction.'
//     };
//   }
// };

// module.exports = {
//   handleSocketInteraction
// };