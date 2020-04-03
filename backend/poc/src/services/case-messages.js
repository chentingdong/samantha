'use strict';
const dynamodbConnector = require( '../connectors/dynamodb' );
const uuid = require( 'uuid' );

module.exports.createCaseMessage = async ( event, context ) => {
  const id = uuid.v4();
  const { caseId, data } = event.body;
  await dynamodbConnector.createCaseMessage( id, caseId, data );
  return { id };
};

module.exports.getCaseMessage = async ( event, context ) => {
  const { caseId } = event.path;
  const { Item = {} } = await dynamodbConnector.listCaseMessages( caseId );
  return Item;
};

module.exports.listCaseMessages = async ( event, context ) => {
  // query params are optional, so deep destructuring with default values here
  const { query: { caseId } = {} } = event;
  const { Items = [] } = caseId
    ? await dynamodbConnector.listCaseMessagesByCase( caseId )
    : await dynamodbConnector.listCaseMessages();
  return Items;
};

module.exports.deleteCaseMessage = async ( event, context ) => {
  const { caseMessageId: id } = event.path;
  await dynamodbConnector.deleteCaseMessage( id );
  return [];
};
