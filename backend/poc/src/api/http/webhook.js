"use strict";
const { apiGatewayConnector } = require("../../infra/apigateway");
const dynamodbConnector = require("../../infra/dynamodb");

module.exports.webhook = async (event, context) => {
  // Retrieve the message from the socket payload
  const { taskId } = event.body;
  const { Item: task } = await dynamodbConnector.getTask(taskId);
  if (!task) {
    throw new Error("Can't find task");
  }
  const sockets = await dynamodbConnector.listSocketsByUser(task.data.userId);
  console.debug(`User ${task.data.userId} sockets ${JSON.stringify(sockets)}`);
  const promises = [];
  sockets.Items.forEach(function (item) {
    const connectionId = item.connectionId;
    const responseMessage = {
      action: "WEBHOOK",
      message: "",
    };
    try {
      promises.push(
        apiGatewayConnector.generateSocketMessage(
          connectionId,
          JSON.stringify(responseMessage)
        )
      );
    } catch (err) {
      console.error(`Unable to respond to ${connectionId}`, err);
    }
  });
  await Promise.all(promises);

  return { message: "Success" };
};
