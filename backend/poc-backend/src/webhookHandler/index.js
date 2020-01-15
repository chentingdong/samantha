const AWS = require('aws-sdk');
const { DynamoDB } = require('@aws-sdk/client-dynamodb-node');

exports.handler = async (event, context) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  const dynamodb = new DynamoDB({});
  const params = {
    TableName: process.env.TABLE_NAME
  };

  let allItems = [];

  try {
    console.log(`Getting data from table ${process.env.TABLE_NAME}.`);
    const items = await dynamodb.scan(params); // get items from DynamoDB
    items.Items.forEach((item) => allItems.push(item)); // put contents in an array for easier parsing
    // allItems.forEach(item => console.log(`Item ${item.id}: ${item.task}\n`)); // log the contents
  } catch (error) {
    console.log(`Error getting data from table ${process.env.TABLE_NAME}. Make sure this function is running in the same environment as the table.`);
    throw new Error(error); // stop execution if data from dynamodb not available
  }

  const EXTENSION_LENGTH = 3;
  const endpoint = process.env.API_URL_2
  const trimmed_endpoint = endpoint.substr( endpoint.indexOf(':') + EXTENSION_LENGTH );

  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: trimmed_endpoint,
  });  

  const promises = [];
  allItems.forEach(function(item){
    const connectionId = item.id.S;
    const task = item.task;
    const wsResponse = JSON.stringify({utterance: `task '${task}' is done.`});
    
    promises.push(apigwManagementApi.postToConnection(
      { 
        ConnectionId: connectionId, 
        Data: wsResponse
      }).promise()
      .then(value => {
        console.log(`successfully sent ${wsResponse} to connection ${connectionId}`);           // successful response
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        if (error.statusCode == 410) 
          return { status:"stale", connectionId:connectionId };      
      })
    );
  });
  
  const results = await Promise.all(promises);

  // Wait for all of our promises, and clean up any stale connections
  var delPromises = [];
  for (const result of results) {
      if (result && (result.status == 'stale')) {
          console.log("Found stale connection, deleting " + result.connectionId);
          delPromises.push(dynamodb.deleteItem({TableName: process.env.TABLE_NAME, Key:{id: {S: result.connectionId}}}));
      }        
  }
  const delResults = await Promise.all(delPromises);

  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: `success`
  };

  return response;
};
