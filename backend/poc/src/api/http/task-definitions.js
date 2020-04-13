"use strict";
const dynamodbConnector = require("../../infra/dynamodb");
const uuid = require("uuid");

module.exports.createTaskDefinition = async (event, context) => {
  const id = uuid.v4();
  const data = event.body;
  await dynamodbConnector.createTaskDefinition(id, data);
  return { id };
};

module.exports.getTaskDefinition = async (event, context) => {
  const { taskDefinitionId: id } = event.path;
  const { Item = {} } = await dynamodbConnector.getTaskDefinition(id);
  return Item;
};

module.exports.listTaskDefinitions = async (event, context) => {
  const { Items = [] } = await dynamodbConnector.listTaskDefinitions();
  return Items;
};

module.exports.deleteTaskDefinition = async (event, context) => {
  const { taskDefinitionId: id } = event.path;
  await dynamodbConnector.deleteTaskDefinition(id);
  return [];
};
