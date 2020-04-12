"use strict";
const dynamodbConnector = require("../../infra/dynamodb");
const uuid = require("uuid");

module.exports.createSocket = async (event, context) => {
  const connectionId = uuid.v4();
  const { userId } = event.body;
  await dynamodbConnector.createSocket(connectionId, userId);
  return { connectionId };
};

module.exports.listSockets = async (event, context) => {
  const { query: { userId } = {} } = event;
  const { Items = [] } = userId
    ? await dynamodbConnector.listSocketsByUser(userId)
    : await dynamodbConnector.listSockets();
  return Items;
};

module.exports.deleteSocket = async (event, context) => {
  const { socketId: connectionId } = event.path;
  await dynamodbConnector.deleteSocket(connectionId);
  return [];
};
