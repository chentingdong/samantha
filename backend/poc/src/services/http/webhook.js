"use strict";
const apigatewayConnector = require("../../connectors/apigateway");
const dynamodbConnector = require("../../connectors/dynamodb");

module.exports.webhook = async (event, context) => {
  // Retrieve the message from the socket payload
  const { taskId } = event.body;
  const { Item: task } = await dynamodbConnector.getTask(taskId);
  if (!task) {
    throw new Error("Can't find task");
  }
  const sockets = await dynamodbConnector.listSocketsByUser(task.data.userId);
  console.log(JSON.stringify(sockets));
  const promises = [];
  sockets.Items.forEach(function (item) {
    const connectionId = item.connectionId;
    const responseMessage = {
      body: {
        utterance: `Finished task ${task.data}. TaskId: ${taskId}`,
      },
    };
    try {
      promises.push(
        apigatewayConnector.generateSocketMessage(
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
