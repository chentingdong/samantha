const uuidv4 = require( 'uuid/v4' );
const dynamodbConnector = require( '../connectors/dynamodb' );
const { crossDeviceBroadcast } = require( './websocket' );

const taskResponseToOwner = async ( { caseId, task } ) => {
  try {
    // response to owner after created a task, this should come from a task template that can be changed by task designer.
    let utterance = `Task response msg generated from backend based on task data.`;
    const user = task.owner;

    // write to message queue
    let message = {
      id: uuidv4(),
      caseId: caseId,
      data: {
        utterance: utterance,
        fromUser: user,
        toUser: user,
        createdAt: Date.now()
      }
    };

    await dynamodbConnector.createCaseMessage( message );

    //device broadcast to owner of the task
    crossDeviceBroadcast( user, utterance );
  }
  catch ( err ) {
    console.error( err );
  }
};


module.exports = {
  taskResponseToOwner
};