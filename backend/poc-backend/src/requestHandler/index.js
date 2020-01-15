const { DynamoDB } = require('@aws-sdk/client-dynamodb-node');

module.exports.handler = async (event) => {
  console.log(JSON.stringify(event, 2));
  
  let task = '';
  let connectionId = '';
  let message = '';
  try {
      message = JSON.parse(event.body);
      console.log(message);
      task = message.task || '';
      
      connectionId = event.requestContext.connectionId;
      console.log(connectionId);
  } catch (e) {
      console.log(e);
  }

  const dynamodb = new DynamoDB({});
  const params = {
    TableName: process.env.TABLE_NAME, // get the table name from the automatically populated environment variables
    Item: {
      id: {S: connectionId},
      task: {S: task},
    }
  };

  try {
    // Write a new item to the Items table
    await dynamodb.putItem(params);
    console.log(`Writing item ${params.Item.id.S} to table ${process.env.TABLE_NAME}.`);
  } catch (error) {
    console.log(`Error writing to table ${process.env.TABLE_NAME}. Make sure this function is running in the same environment as the table.`);
    console.log(error.stack);
    throw new Error(error); // stop execution if dynamodb is not available
  }  

  // response to websocket
  return {
    body: JSON.stringify({
        utterance: `Working on task '${task}'.`
    })
  };
};