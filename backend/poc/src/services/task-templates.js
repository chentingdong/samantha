const uuidv4 = require( 'uuid/v4' );
const dynamodbConnector = require( '../connectors/dynamodb' );
const { crossDeviceBroadcast } = require( './websocket' );

// templates for machine generated message, based on general fields of task wrapper.
const taskBroadcastToOwner = async ( caseId, task ) => {
  try {
    // TODO: need templates for tasks. This is temperary.
    let utterance = `Your task "${task.name}" is added to current case.`
      + `Your message is sent to ${ task.owner.name },`
      + `expecting to finish on ${ task.dueDate },`
      + `I will inform him after ${ task.followUpDuration} days if not finished.`

    const user = task.owner;
    const agent = {
      name: 'agent'
    }
    // write to message queue
    let message = {
      id: uuidv4(),
      caseId: caseId,
      data: {
        utterance: utterance,
        fromUser: agent,
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

const taskNoticeAssigneeGroup = async ( { groupId, task } ) => {
  console.log( 'TODO: after group is settled down.' );
}

module.exports = {
  taskBroadcastToOwner,
  taskNoticeAssigneeGroup
};