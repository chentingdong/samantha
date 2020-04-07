const { SQS } = require("aws-sdk");
const dynamodbConnector = require("../connectors/dynamodb");

const sqs = new SQS();

module.exports.taskCompleteSendEvent = async (event, context) => {
  let statusCode = 200;
  let message = "";

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No body was found",
      }),
    };
  }

  const queueUrl = process.env.IS_OFFLINE
    ? `http://localhost:9324/queue/${process.env.SQS_TASK_COMPLETE_QUEUE}`
    : process.env.SQS_TASK_COMPLETE_URL;

  try {
    await sqs
      .sendMessage({
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(event.body),
        MessageAttributes: {
          state: {
            StringValue: event.body.state,
            DataType: "String",
          },
        },
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
  function updateDependentTask(updatedTask, task) {
    console.log(`unblock/block ${task.id}`);
    if (updatedTask.state === "Complete" && task.state === "Pending") {
      dynamodbConnector.updateTaskState(task.id, "Active");
    } else if (updatedTask.state === "Active" && task.state === "Active") {
      dynamodbConnector.updateTaskState(task.id, "Pending");
    }
  }

  try {
    for (const record of event.Records) {
      let updatedTask = JSON.parse(record.body);
      const result = await dynamodbConnector.listTasks();
      result.Items.forEach((task) => {
        let i = task.data.dependsOns.indexOf(updatedTask.id);
        if (i > -1) {
          task.data.dependsOns.splice(i, 1);
          if (task.data.dependsOns.length === 0)
            updateDependentTask(updatedTask, task);
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
