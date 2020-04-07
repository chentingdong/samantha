"use strict";
const dynamodbConnector = require("../../connectors/dynamodb");
const uuid = require("uuid");

module.exports.createCase = async (event, context) => {
  const id = uuid.v4();
  const state = "Active";
  const data = event.body;
  await dynamodbConnector.createCase(id, state, data);
  return { id, state };
};

module.exports.getCase = async (event, context) => {
  const { caseId: id } = event.path;
  const { Item = {} } = await dynamodbConnector.getCase(id);
  return Item;
};

module.exports.listCases = async (event, context) => {
  const { CaseInstance } = require("../../core/models/case-instance");
  // const ci = new CaseInstance();
  const { Items = [] } = await dynamodbConnector.listCases();
  return Items;
};

module.exports.completeCase = async (event, context) => {
  const state = "Complete";
  const { caseId: id } = event.path;
  await dynamodbConnector.updateCaseState(id, state);
  return { id, state };
};

module.exports.deleteCase = async (event, context) => {
  const { caseId: id } = event.path;
  await dynamodbConnector.deleteCase(id);
  return [];
};

module.exports.addCaseParticipant = async (event, context) => {
  const { caseId, username } = event.path;
  const caseData = await addCaseParticipantToDb(caseId, [username]);
  return { caseId, caseData };
};

const addCaseParticipantToDb = async (caseId, users) => {
  const caseItem = await dynamodbConnector.getCase(caseId);
  const caseData = caseItem.Item.data;

  const { participants = [] } = caseData;
  users.forEach((user) => {
    if (participants.indexOf(user) === -1) participants.push(user);
  });
  caseData["participants"] = participants;

  await dynamodbConnector.updateCaseData(caseId, caseData);
  return caseData;
};
module.exports.addCaseParticipantToDb = addCaseParticipantToDb;
