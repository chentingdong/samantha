"use strict";
const dynamodbConnector = require("../../connectors/dynamodb");
const uuid = require("uuid");

module.exports.createCase = async (event, context) => {
  const newCase = {
    id: uuid.v4(),
    state: "Active",
    data: event.body,
  };
  await dynamodbConnector.createCase(newCase);
  return newCase;
};

module.exports.getCase = async (event, context) => {
  const { caseId: id } = event.path;
  const { Item = {} } = await dynamodbConnector.getCase(id);
  return Item;
};

module.exports.listCases = async (event, context) => {
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
  const resp = await dynamodbConnector.getCase(caseId);
  const caseItem = resp.Item;
  const participants = caseItem.data.participants;
  users.forEach((user) => {
    if (participants.indexOf(user) === -1) participants.push(user);
  });
  caseItem.data["participants"] = participants;

  await dynamodbConnector.updateCaseData(caseItem.id, caseItem.data);
  return caseItem;
};
module.exports.addCaseParticipantToDb = addCaseParticipantToDb;
