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

  const queueUrl = "http://localhost:9324/queue/taskCompleteQueue";

  try {
    await sqs
      .sendMessage({
        QueueUrl: queueUrl,
        MessageBody: event.body,
        MessageAttributes: {
          AttributeNameHere: {
            StringValue: "Attribute Value Here",
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
  try {
    for (const record of event.Records) {
      let completedTaskId = record.body;
      const result = await dynamodbConnector.listTasks();
      result.Items.forEach((dependentTask) => {
        let i = dependentTask.data.dependsOns.indexOf(completedTaskId);
        if (i > -1) {
          dependentTask.data.dependsOns.splice(i, 1);
          if (dependentTask.data.dependsOns.length === 0) {
            console.log(`unblock ${dependentTask.id}`);
            if (dependentTask.state === "Pending")
              dynamodbConnector.updateTaskState(dependentTask.id, "Active");
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
