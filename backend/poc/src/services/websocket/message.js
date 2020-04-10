const uuidv4 = require("uuid/v4");
const apigatewayConnector = require("../../connectors/apigateway");
const dynamodbConnector = require("../../connectors/dynamodb");

/**
 * Tell UI to refresh, exp., tasks, cases, etc.
 */
const uiRefreshOne = async (username, target) => {
  try {
    const sockets = await dynamodbConnector.listSocketsByUser(username);
    sockets.Items.forEach(async (item) => {
      const connectionId = item.connectionId;
      const data = {
        target: target,
        type: "REFRESH",
      };
      let promises = [];
      promises.push(
        apigatewayConnector.generateSocketMessage(
          connectionId,
          JSON.stringify(data)
        )
      );
      await Promise.all(promises);
    });
  } catch (err) {
    console.error(`failed to refresh UI, ${err}`);
  }
};

module.exports.uiRefresh = async (target, data) => {
  let allUsers = [...data.participants, data.owner];
  let promises = [];
  allUsers.forEach(async (u) => {
    promises.push(uiRefreshOne(u, target));
  });
  await Promise.all(promises);
};

/**
 * save messages to persist.
 */
module.exports.saveMessage = async (caseId, taskId, data) => {
  const id = uuidv4();
  caseMessage = { id, caseId, taskId, data };
  return await dynamodbConnector.createCaseMessage(caseMessage);
};
