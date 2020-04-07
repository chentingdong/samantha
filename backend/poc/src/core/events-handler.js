const { SQS } = require("aws-sdk");
const dynamodbConnector = require("../connectors/dynamodb");
const { isOffline } = require("../utils");

module.exports.taskCompleteSendEvent = async (event, context) => {
  let statusCode = 200;
  let message = "";

  const queueUrl = isOffline()
    ? `http://localhost:9324/queue/${process.env.SQS_TASK_COMPLETE_QUEUE}`
    : process.env.SQS_TASK_COMPLETE_URL;

  try {
    await new SQS()
      .sendMessage({
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(event),
      })
      .promise();

    message = "Message placed in the Queue!";
  } catch (error) {
    console.log(error);
    message = error;
    statusCode = 500;
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
    }),
  };
};

module.exports.taskDependencyHandler = async (event, context) => {
  async function updateDependentTask(updatedTask, task) {
    console.log(`unblock/block ${task.id}`);
    if (updatedTask.state === "Complete" && task.state === "Pending") {
      await dynamodbConnector.updateTaskState(task.id, "Active");
    } else if (updatedTask.state === "Active" && task.state === "Active") {
      await dynamodbConnector.updateTaskState(task.id, "Pending");
    }
  }

  try {
    for (const record of event.Records) {
      let updatedTask = JSON.parse(record.body);
      const result = await dynamodbConnector.listTasks();
      result.Items.forEach((task) => {
        if (updatedTask.id === task.id) {
          updatedTask = task;
        } else {
          let i = task.data.dependsOns.indexOf(updatedTask.id);
          if (i > -1) {
            task.data.dependsOns.splice(i, 1);
            // update states when thre is no more dependsOns
            if (task.data.dependsOns.length === 0)
              updateDependentTask(updatedTask, task);
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
  return {
    statusCode: 200,
    body: "taskDependencyHandler successfully unblocked dependend tasks.",
  };
};
