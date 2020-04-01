const uuidv4 = require( 'uuid/v4' );
const dynamodbConnector = require( '../connectors/dynamodb' );
const { crossDeviceBroadcast } = require( './websocket' );

/**
 * templates for machine generated message, based on general fields of task wrapper.
 * @param {*} caseId
 * @param {*} task
 * TODO: task templates should relate to tasks in rds. This is temperary solution.
 */
const taskBroadcastToOwner = async ( caseId, task ) => {
  try {
    let utterance = `Your task "${ task.name }" is added to current case.`
      + `Your message is sent to ${ task.assignee } (use name here, fix later),`
      + `expecting to finish on ${ task.dueDate },`
      + `I will inform him after ${ task.followUpDuration } days if not finished.`;

    const user = task.owner;
    const agent = process.env.USER ? 'agent-' + process.env.USER : 'agent-smith';
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
    await crossDeviceBroadcast( user, utterance );
  }
  catch ( err ) {
    console.error( err );
  }
};

const taskNoticeAssigneeGroup = async ( { users, task } ) => {
  console.log( 'TODO: after group is in place.' );
};

module.exports = {
  taskBroadcastToOwner,
  taskNoticeAssigneeGroup
};