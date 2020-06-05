"use strict";
const dynamodbConnector = require("../../infra/dynamodb");
const uuid = require("uuid");

module.exports.createCaseDefinition = async (event, context) => {
  const id = uuid.v4();
  const data = event.body;
  await dynamodbConnector.createCaseDefinition(id, data);
  return { id };
};

module.exports.getCaseDefinition = async (event, context) => {
  const { caseDefinitionId: id } = event.path;
  const { Item = {} } = await dynamodbConnector.getCaseDefinition(id);
  return Item;
};

module.exports.listCaseDefinitions = async (event, context) => {
  const { Items = [] } = await dynamodbConnector.listCaseDefinitions();
  return Items;
};

module.exports.deleteCaseDefinition = async (event, context) => {
  const { caseDefinitionId: id } = event.path;
  await dynamodbConnector.deleteCaseDefinition(id);
  return [];
};
