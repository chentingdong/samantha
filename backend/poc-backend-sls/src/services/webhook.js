'use strict';

const apigatewayConnector = require('../connectors/apigateway');
const dynamodbConnector = require('../connectors/dynamodb');
const CONSTANTS = require('../constants');

const webhook = async (event, context) => {
    try {
        // Log the event argument for debugging and for use in local development.
        console.log(JSON.stringify(event, undefined, 2));

        // Retrieve the message from the socket payload
        const data = JSON.parse(event.body);
        const taskId = uuidv4();
        try {
            const tasks = await dynamodbConnector.findTask(
                taskId
            );
        } catch (err) {
            console.error(`Unable to find taskId ${taskId}`, err)
        }

        const responseMessage = {
            body: {
                utterance: `Working on ${taskData}. TaskId: ${taskId}`
            }
        };

        try {
            await apigatewayConnector.generateSocketMessage(
                connectionId,
                JSON.stringify(responseMessage)
            );
        } catch (err) {
            console.error(`Unable to respond to ${connectionId}`, err);
        }

        // Let the API Gateway Websocket know everything went OK.
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN
            },
            body: 'Success.'
        };
    } catch (err) {
        // Notify API Gateway Websocket in case of error, also log it on
        // CloudWatch
        console.error('Unable to handle interaction', err);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': CONSTANTS.CORS_ORIGIN
            },
            body: 'Unable to handle interaction.'
        }
    }
};

module.exports = {
    webhook
};
