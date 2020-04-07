import {
  APIGatewayProxyHandler,
  SQSHandler,
  SQSMessageAttributes,
} from "aws-lambda";
import { SQS } from "aws-sdk";

const sqs = new SQS();

const sender: APIGatewayProxyHandler = async (event, context) => {
  let statusCode: number = 200;
  let message: string;

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No body was found",
      }),
    };
  }

  const queueUrl: string = "http://localhost:9324/queue/taskCompleteQueue";

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

module.exports.sender = sender;

const taskDependencyHandler: SQSHandler = async (event, context) => {
  try {
    for (const record of event.Records) {
      const messageAttributes: SQSMessageAttributes = record.messageAttributes;
      console.log(
        "Message Attributtes -->  ",
        messageAttributes.AttributeNameHere.stringValue
      );
      console.log("Message Body -->  ", record.body);
      // Do something
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.taskDependencyHandler = taskDependencyHandler;
