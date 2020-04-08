"use strict";

const apigatewayConnector = require("../../connectors/apigateway");
const dynamodbConnector = require("../../connectors/dynamodb");
const CONSTANTS = require("../../constants");

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
