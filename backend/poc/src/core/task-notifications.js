const uuidv4 = require("uuid/v4");
const dynamodbConnector = require("../connectors/dynamodb");
const {
  crossDeviceBroadcast,
  groupNotice,
} = require("../services/websocket/message");

/**
 * templates for machine generated message, based on general fields of task wrapper.
 * TODO: These utterances should be data, not codes.
 * @param {*} caseId
 * @param {*} task
 */
module.exports.taskNoticeCreateToOwner = async (task) => {
  try {
    let toUser = task.data.owner;
    let utterance =
      `@${toUser}, Your task "${task.data.name}" is added to current case. ` +
      `I've notified ${task.data.participants.join(", ")}, ` +
      `expecting to finish on ${task.data.dueDate}. ` +
      `I will inform him after ${task.data.followUpDays} days if not finished.`;

    crossDeviceBroadcast(task.data.owner, utterance);
    await saveMessage(task.caseId, task.id, utterance, [toUser]);
  } catch (err) {
    console.error(err);
  }
};

module.exports.taskNoticeCreateToParticipants = async (task) => {
  try {
    let utterance =
      `${task.data.owner} assigned you a task "${task.data.name}", ` +
      `please cooperate with ${task.data.participants.join(", ")}, ` +
      `and try to finish it by ${task.data.dueDate}.`;

    await groupNotice(task.data.participants, utterance);
    await saveMessage(task.caseId, task.id, utterance, task.data.participants);
  } catch (err) {
    console.error(err);
  }
};

module.exports.taskNoticeStatusToParticipants = async (task) => {
  try {
    let utterance = `Your task "${task.data.name}" status is updated to "${task.state}".`;
    await groupNotice(task.data.participants, utterance);
    await saveMessage(task.caseId, task.id, utterance, task.data.participants);
  } catch (err) {
    console.error(err);
  }
};

module.exports.taskNoticeDependencyStatusToParticipants = async (
  updatedTask,
  task
) => {
  try {
    let blockUtterance =
      updatedTask.state === "Complete"
        ? "so it is unblocked, you can start working on it."
        : "is currently blocked, please start working on it once it's completed.";
    let utterance =
      `For "${task.data.name}", the dependent task "${updatedTask.data.name}" ` +
      `status is updated to ${updatedTask.state}, ${blockUtterance}.`;

    await groupNotice(updatedTask.data.participants, utterance);
    await saveMessage(task.caseId, task.id, utterance, task.data.participants);
  } catch (err) {
    console.error(err);
  }
};

async function saveMessage(caseId, taskId, utterance, users) {
  const agent = process.env.USER ? "agent-" + process.env.USER : "agent-smith";
  // write to message queue
  users.forEach(async (user) => {
    const id = uuidv4();
    const data = {
      utterance: utterance,
      fromUser: agent,
      toUser: user,
      createdAt: Date.now(),
    };

    await dynamodbConnector.createCaseMessage(id, caseId, taskId, data);
  });
}
