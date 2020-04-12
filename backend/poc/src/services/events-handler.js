const { SQS } = require("aws-sdk");
const dynamodbConnector = require("../infra/dynamodb");
const { isOffline } = require("../utils");
const {
  taskNoticeStatusToParticipants,
  taskNoticeDependencyStatusToParticipants,
} = require("./task-notifications");
const sqs = new SQS();

module.exports.taskUpdateStateSendEvent = async (event, context) => {
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
    if (updatedTask.state === "Complete" && task.state === "Pending") {
      await dynamodbConnector.updateTaskState(task.id, "Active");
    } else if (updatedTask.state === "Active" && task.state === "Active") {
      await dynamodbConnector.updateTaskState(task.id, "Pending");
    }
    console.debug(`successfully unblock/block ${task.id}`);
  }

  try {
    for (const record of event.Records) {
      let updatedTaskPartial = JSON.parse(record.body);
      const result = await dynamodbConnector.listTasks();
      let updatedTask = result.Items.filter(
        (t) => t.id === updatedTaskPartial.id
      )[0];
      await taskNoticeStatusToParticipants(updatedTask);
      result.Items.forEach(async (task) => {
        let i = task.data.dependsOns.indexOf(updatedTask.id);
        if (i > -1) {
          task.data.dependsOns.splice(i, 1);
          // update states when thre is no more dependsOns
          if (task.data.dependsOns.length === 0) {
            await updateDependentTask(updatedTask, task);
            await taskNoticeDependencyStatusToParticipants(updatedTask, task);
          }
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
  return {
    statusCode: 200,
    body: "taskDependencyHandler successfully updated dependend tasks states.",
  };
};
