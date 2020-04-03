'use strict';
const apigatewayConnector = require('../connectors/apigateway');
const dynamodbConnector = require('../connectors/dynamodb');

module.exports.webhook = async (event, context) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  // Retrieve the message from the socket payload
  const data = JSON.parse(event.body);
  const taskId = data.taskId;
  let tasks = [];
  try {
    tasks = await dynamodbConnector.getTask(
      taskId
    );
    if (tasks.Items.length < 1) {
      throw new Error("Tasks length less than 1");
    }
    console.log(JSON.stringify(tasks));
  } catch (err) {
    console.error(`Unable to find taskId ${taskId}`, err)
  }

  const task = tasks.Items[0];
  const sockets = await dynamodbConnector.listSocketsByUser(task.userId);
  console.log(JSON.stringify(sockets));
  const promises = [];
  sockets.Items.forEach(function (item) {
    const connectionId = item.connectionId;
    const responseMessage = {
      body: {
        utterance: `Finished task ${task.data}. TaskId: ${taskId}`
      }
    };
    try {
      promises.push(apigatewayConnector.generateSocketMessage(
        connectionId,
        JSON.stringify(responseMessage)
      ));
    } catch (err) {
      console.error(`Unable to respond to ${connectionId}`, err);
    }
  });
  await Promise.all(promises);

  return {message: 'Success'};
};