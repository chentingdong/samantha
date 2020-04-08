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
      const data = {
        utterance: utterance,
        type: "MESSAGE",
      };
      promises.push(
        apigatewayConnector.generateSocketMessage(
          connectionId,
          JSON.stringify(data)
        )
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
 * Tell UI to refresh, exp., tasks, cases, etc.
 */
const uiRefreshOne = async (username, target) => {
  try {
    const sockets = await dynamodbConnector.listSocketsByUser(username);
    const promises = [];
    sockets.Items.forEach(function (item) {
      const connectionId = item.connectionId;
      const data = {
        target: target,
        type: "REFRESH",
      };
      promises.push(
        apigatewayConnector.generateSocketMessage(
          connectionId,
          JSON.stringify(data)
        )
      );
    });
    await Promise.all(promises);
  } catch (err) {
    console.error(`failed cross device broadcasting, ${err}`);
  }
};

module.exports.uiRefresh = async (target, data) => {
  let allUsers = [...data.participants, data.owner];
  allUsers.forEach(async (u) => {
    await uiRefreshOne(u, target);
  });
};

/**
 * save messages to persist.
 */
module.exports.saveMessage = async (caseId, taskId, data) => {
  const id = uuidv4();
  caseMessage = { id, caseId, taskId, data };
  return await dynamodbConnector.createCaseMessage(caseMessage);
};
