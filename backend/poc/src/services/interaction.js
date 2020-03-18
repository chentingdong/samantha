// 'use strict';

// const apigatewayConnector = require('../connectors/apigateway');
// const dynamodbConnector = require('../connectors/dynamodb');
// const CONSTANTS = require('../constants');
// const uuidv4 = require('uuid/v4');

// const handleSocketInteraction = async (event, context) => {
//   try {
//     // userId should be from Cognito

//     // write to message queue
//     let id = uuidv4()
//     let resp = JSON.parse( event.body )
//     let caseId = resp.caseId
//     let data = resp.data

//     try {
//       await dynamodbConnector.createCaseMessage( id, caseId, data)
//     }
//     catch ( err ) {
//       console.error(`Unable to add case message: ${err}`)
//     }

//     // response to user
//     const responseMessage = {
//       body: {
//         utterance: `Got message: ${data.message}. caseId: ${caseId}`
//       }
//     };

//     try {
//       await apigatewayConnector.generateSocketMessage(
//         connectionId,
//         JSON.stringify(responseMessage)
//       );
//     } catch (err) {
//       console.error(`Unable to respond to ${connectionId}`, err);
//     }

//     // Let the API Gateway Websocket know everything went OK.
//     return {
//       statusCode: 200,
//       headers: CONSTANTS.RESPONSE_HEADERS,
//       body: 'Success.'
//     };
//   } catch (err) {
//     // Notify API Gateway Websocket in case of error, also log it on
//     // CloudWatch
//     console.error('Unable to handle interaction', err);
//     return {
//       statusCode: 500,
//       headers: CONSTANTS.RESPONSE_HEADERS,
//       body: 'Unable to handle interaction.'
//     }
//   }
// };

// module.exports = {
//   handleSocketInteraction
// };
