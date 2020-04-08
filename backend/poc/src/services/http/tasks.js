const dynamodbConnector = require("../../connectors/dynamodb");
const uuid = require("uuid");
const {
  taskNoticeCreateToOwner,
  taskNoticeCreateToParticipants,
} = require("../../core/task-notifications");
const { addCaseParticipantToDb } = require("./cases");
const { taskCompleteSendEvent } = require("../../core/events-handler");

module.exports.createTask = async (event, context) => {
  const id = uuid.v4();
  const { caseId } = event.path;
  const taskData = event.body;

  const { Item = {} } = await dynamodbConnector.getCase(caseId);
  const caseData = Item.data;

  // create task
  let state = (await task_blocked(taskData)) ? "Pending" : "Active";
  await dynamodbConnector.createTaskInCase(id, caseId, state, taskData);

  // add participant to case participants
  await addCaseParticipantToDb(caseId, taskData.participants);

  // notification
  let task = { id, caseId, state, data: taskData };
  await taskNoticeCreateToOwner(task);
  await taskNoticeCreateToParticipants(task);

  return task;
};

async function task_blocked(taskData) {
  let dependsOns = taskData.dependsOns;
  let { Items = [] } = await dynamodbConnector.listTasks();
  let blocked = false;
  Items.forEach((t) => {
    if (dependsOns.indexOf(t.id) > -1 && t.state !== "Complete") {
      blocked = true;
    }
  });
  return blocked;
}
module.exports.getTask = async (event, context) => {
  const { taskId: id } = event.path;
  const { Item = {} } = await dynamodbConnector.getTask(id);
  return Item;
};

module.exports.listTasks = async (event, context) => {
  const { path: { caseId } = {} } = event;
  const { Items = [] } = caseId
    ? await dynamodbConnector.listTasksByCase(caseId)
    : await dynamodbConnector.listTasks();
  return Items;
};

module.exports.deleteTask = async (event, context) => {
  const { taskId: id } = event.path;
  await dynamodbConnector.deleteTask(id);
  return [];
};

module.exports.updateTaskState = async (event, context) => {
  const { taskId: id, state } = event.path;
  await dynamodbConnector.updateTaskState(id, state);

  let evt = {
    id: id,
    state: state,
  };
  let resp = await taskCompleteSendEvent(evt, context);
  console.log(`sent to sqs: ${JSON.stringify(resp)}`);

  return { id, state };
};
