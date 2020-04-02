const uuidv4 = require( 'uuid/v4' );
const dynamodbConnector = require( '../connectors/dynamodb' );
const { crossDeviceBroadcast, groupNotice } = require( './websocket' );

/**
 * templates for machine generated message, based on general fields of task wrapper.
 * @param {*} caseId
 * @param {*} task
 * TODO: task templates should relate to tasks in rds. This is temperary solution.
 */
const taskBroadcastToOwner = async ( caseId, task ) => {
  try {
    let utterance = `Your task "${ task.name }" is added to current case.`
      + `Your message is sent to ${ task.participants } (use name here, fix later),`
      + `expecting to finish on ${ task.dueDate },`
      + `I will inform him after ${ task.followUpDuration } days if not finished.`;

    const agent = process.env.USER ? 'agent-' + process.env.USER : 'agent-smith';
    // write to message queue
    let message = {
      id: uuidv4(),
      caseId: caseId,
      data: {
        utterance: utterance,
        fromUser: agent,
        toUser: task.owner,
        createdAt: Date.now()
      }
    };

    await dynamodbConnector.createCaseMessage( message );
    await crossDeviceBroadcast( task.owner, utterance );
  }
  catch ( err ) {
    console.error( err );
  }
};

const taskNoticeAssigneeGroup = async ( { users, task } ) => {
  try {
    let utterance = `${ task.owner } assigned you a task "${ task.name }",`
      + ` please try to finish it by ${ task.dueDate }`;

    users.forEach( ( user ) => {
      groupNotice( [ user ], utterance );
    } );
  }
  catch ( err ) {
    console.error( err );
  }
  console.log( 'Task notice successfully sent to participants.' );
};

module.exports = {
  taskBroadcastToOwner,
  taskNoticeAssigneeGroup
};