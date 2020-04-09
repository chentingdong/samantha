const dynamodbConnector = require("../connectors/dynamodb");
const { saveMessage, uiRefreshOne } = require("../services/websocket/message");

// const {
//   crossDeviceBroadcast,
//   groupNotice,
// } = require("../services/websocket/message");

async function saveAgentMessages(message) {
  const { caseId, taskId, utterance, users } = message;
  const agent = process.env.USER ? "agent-" + process.env.USER : "agent-smith";
  users.forEach(async (user) => {
    const data = {
      utterance: utterance,
      fromUser: agent,
      toUser: user,
      createdAt: Date.now(),
    };
    await saveMessage(caseId, taskId, data);
  });
}

module.exports.taskNoticeCreateToOwner = async (task) => {
  try {
    let toUser = task.data.owner;
    let utterance =
      `@${toUser}, Your task "${task.data.name}" is added to current case. ` +
      `I've notified ${task.data.participants.join(", ")}, ` +
      `expecting to finish on ${task.data.dueDate}. ` +
      `I will inform him after ${task.data.followUpDays} days if not finished.`;

    await uiRefreshOne(task.data.owner, utterance);
    let message = {
      caseId: task.caseId,
      taskId: task.id,
      utterance: utterance,
      users: [toUser],
    };
    await saveAgentMessages(message);
  } catch (err) {
    console.error(err);
  }
};

module.exports.taskNoticeCreateToParticipants = async (task) => {
  try {
    let utterance =
      `${task.data.owner} assigned you a task "${task.data.name}", ` +
      `participated users: ${task.data.participants.join(", ")}, ` +
      `and try to finish it by ${task.data.dueDate}.`;

    // await groupNotice(task.data.participants, utterance);
    let message = {
      caseId: task.caseId,
      taskId: task.id,
      utterance: utterance,
      users: task.data.participants,
    };
    await saveAgentMessages(message);
  } catch (err) {
    console.error(err);
  }
};

module.exports.taskNoticeStatusToParticipants = async (task) => {
  try {
    let utterance = `Your task "${task.data.name}" status is updated to "${task.state}".`;
    // await groupNotice(task.data.participants, utterance);
    let message = {
      caseId: task.caseId,
      taskId: task.id,
      utterance: utterance,
      users: task.data.participants,
    };
    await saveAgentMessages(message);
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

    // await groupNotice(updatedTask.data.participants, utterance);
    let message = {
      caseId: task.caseId,
      taskId: task.id,
      utterance: utterance,
      users: task.data.participants,
    };
    await saveAgentMessages(message);
  } catch (err) {
    console.error(err);
  }
};
