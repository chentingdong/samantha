const uuidv4 = require("uuid/v4");
const dynamodbConnector = require("../connectors/dynamodb");
const { crossDeviceBroadcast, groupNotice } = require("../services/websocket");

/**
 * templates for machine generated message, based on general fields of task wrapper.
 * @param {*} caseId
 * @param {*} task
 */
module.exports.taskCreateBroadcastToOwner = async (caseId, task) => {
  try {
    let utterance =
      `Your task "${task.name}" is added to current case.` +
      `Your message is sent to ${task.participants} (use name here, fix later),` +
      `expecting to finish on ${task.dueDate},` +
      `I will inform him after ${task.followUpDays} days if not finished.`;

    let toUser = task.owner;
    await saveMessage(caseId, utterance, toUser);
    crossDeviceBroadcast(task.owner, utterance);
  } catch (err) {
    console.error(err);
  }
};

module.exports.taskCreateNoticeParticipants = async ({
  caseId,
  participants,
  task,
}) => {
  try {
    let utterance =
      `${task.owner} assigned you a task "${task.name}",` +
      ` please try to finish it by ${task.dueDate}`;

    participants.forEach((participant) => {
      groupNotice(participants, caseId, utterance);
      saveMessage(caseId, utterance, participant);
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports.taskTransitionNoticeParticipants = async ({
  participants,
  dependOnTask,
  task,
}) => {
  try {
    let utterance =
      `Dependent task <b>${dependOnTask.name}</b> completed, ` +
      `can start working on <b>${task.name}</b> now.`;

    groupNotice(participants, utterance);
  } catch (err) {
    console.error(err);
  }
};

async function saveMessage(caseId, utterance, toUser) {
  const agent = process.env.USER ? "agent-" + process.env.USER : "agent-smith";
  // write to message queue
  const id = uuidv4();
  const data = {
    utterance: utterance,
    fromUser: agent,
    toUser: toUser,
    createdAt: Date.now(),
  };

  await dynamodbConnector.createCaseMessage(id, caseId, data);
}
