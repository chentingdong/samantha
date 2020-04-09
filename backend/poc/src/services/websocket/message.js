const uuidv4 = require("uuid/v4");
const apigatewayConnector = require("../../connectors/apigateway");
const dynamodbConnector = require("../../connectors/dynamodb");

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
