const uuidv4 = require("uuid/v4");
const apigatewayConnector = require("../../connectors/apigateway");
const dynamodbConnector = require("../../connectors/dynamodb");

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
module.exports.groupNotice = (participants, utterance) => {
  try {
    if (participants && participants.length > 0) {
      participants.forEach(async (participant) => {
        await crossDeviceBroadcast(participant, utterance);
      });
      console.debug(`user notice sent: ${utterance}`);
    }
  } catch (err) {
    console.error(`group notice failed, ${err}`);
  }
};

/**
 * save messages to persist.
 */
module.exports.saveMessage = async (caseId, taskId, data) => {
  const id = uuidv4();
  await dynamodbConnector.createCaseMessage(id, caseId, taskId, data);
};
