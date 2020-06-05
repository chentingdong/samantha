"use strict";
const dynamodbConnector = require("../../infra/dynamodb");
const { saveMessage } = require("../websocket/message");
const { uiRefresh } = require("../websocket/message");

module.exports.createCaseMessage = async (event, context) => {
  const { caseId, data } = event.body;
  await saveMessage(caseId, "N/A", data);
  let resp = await dynamodbConnector.getCase(caseId);
  let caseData = resp.Item.data;
  uiRefresh("messages", caseData);
};

module.exports.getCaseMessage = async (event, context) => {
  const { caseId } = event.path;
  const { Item = {} } = await dynamodbConnector.listCaseMessages(caseId);
  return Item;
};

module.exports.listCaseMessages = async (event, context) => {
  // query params are optional, so deep destructuring with default values here
  const { query: { caseId } = {} } = event;
  const { Items = [] } = caseId
    ? await dynamodbConnector.listCaseMessagesByCase(caseId)
    : await dynamodbConnector.listCaseMessages();
  return Items;
};

module.exports.deleteCaseMessage = async (event, context) => {
  const { caseMessageId: id } = event.path;
  await dynamodbConnector.deleteCaseMessage(id);
  return [];
};
