"use strict";

const apigatewayConnector = require("../connectors/apigateway");
const dynamodbConnector = require("../connectors/dynamodb");
const CONSTANTS = require("../constants");

module.exports.handleSocketDefault = async (event, context) => {
  try {
    const data = JSON.parse(event.body);
    const action = data.action;

    const connectionId = event.requestContext.connectionId;
    switch (action) {
      case "PING":
        const pingResponse = JSON.stringify({ action: "PING", value: "PONG" });
        await apigatewayConnector.generateSocketMessage(
          connectionId,
          pingResponse
        );
        break;
      default:
        const invalidResponse = JSON.stringify({
          action: "ERROR",
          error: "Invalid request",
        });
        await apigatewayConnector.generateSocketMessage(
          connectionId,
          invalidResponse
        );
    }

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: "Default socket response.",
    };
  } catch (err) {
    console.error("Unable to generate default response", err);
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: "Default socket response error.",
    };
  }
};

module.exports.handleSocketConnect = async (event, context) => {
  try {
    const userId = event.queryStringParameters.user;
    const connectionId = event.requestContext.connectionId;

    await dynamodbConnector.createSocket(connectionId, userId);

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: "Socket successfully registered.",
    };
  } catch (err) {
    console.error("Unable to initialize socket connection", err);
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: "Unable to register socket.",
    };
  }
};

module.exports.handleSocketDisconnect = async (event, context) => {
  try {
    const connectionId = event.requestContext.connectionId;

    await dynamodbConnector.deleteSocket(connectionId);

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: "Socket successfully terminated.",
    };
  } catch (err) {
    console.error("Unable to terminate socket connection", err);
    return {
      statusCode: 500,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: "Unable to terminate socket.",
    };
  }
};

/**
 * Send message to all devices of one user.
 */
const crossDeviceBroadcast = async (username, utterance) => {
  try {
    const sockets = await dynamodbConnector.listSocketsByUser(username);
    const promises = [];
    sockets.Items.forEach(function (item) {
      const connectionId = item.connectionId;

      promises.push(
        apigatewayConnector.generateSocketMessage(connectionId, utterance)
      );
    });
    await Promise.all(promises);
  } catch (err) {
    console.error(`failed cross device broadcasting, ${err}`);
  }
};

module.exports.crossDeviceBroadcast = crossDeviceBroadcast;

/**
 * Send message to a group of participants
 */
module.exports.groupNotice = async (participants, utterance) => {
  if (participants.length > 0) {
    try {
      participants.map((participant) => {
        crossDeviceBroadcast(participant, utterance);
      });
      console.debug(`user notice sent: ${utterance}`);
    } catch (err) {
      console.error(`group notice failed, ${err}`);
    }
  }
};
