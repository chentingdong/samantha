const dynamodbConnector = require("../../connectors/dynamodb");
const uuid = require("uuid");
const {
  taskNoticeCreateToOwner,
  taskNoticeCreateToParticipants,
} = require("../../core/task-notifications");
const { uiRefresh } = require("../websocket/message");
const { addCaseParticipantToDb } = require("./cases");
const { taskUpdateStateSendEvent } = require("../../core/events-handler");

module.exports.createTask = async (event, context) => {
  const taskData = event.body;
  const task = {
    id: uuid.v4(),
    caseId: event.path.caseId,
    state: (await task_blocked(taskData)) ? "Pending" : "Active",
    data: taskData,
  };

  // create task
  await dynamodbConnector.createTaskInCase(task);

  // add participant to case participants
  const caseItem = await addCaseParticipantToDb(
    task.caseId,
    task.data.participants
  );

  // notification
  await taskNoticeCreateToOwner(task);
  await taskNoticeCreateToParticipants(task);

  // refresh UI for case and task changes
  await uiRefresh("cases", caseItem.data);
  await uiRefresh("tasks", task.data);
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

module.exports.listTasks = async (event, context) => {
  const { path: { caseId } = {} } = event;
  const { Items = [] } = caseId
    ? await dynamodbConnector.listTasksByCase(caseId)
    : await dynamodbConnector.listTasks();
  return Items;
};

module.exports.getTask = async (event, context) => {
  const { taskId: id } = event.path;
  const { Item = {} } = await dynamodbConnector.getTask(id);
  return Item;
};

module.exports.deleteTask = async (event, context) => {
  const { taskId: id } = event.path;
  const resp = await dynamodbConnector.getTask(id);
  const task = resp.Item;
  await dynamodbConnector.deleteTask(id);
  await uiRefresh("tasks", task.data);
  return [];
};

module.exports.updateTaskState = async (event, context) => {
  const { taskId: id, state } = event.path;
  let resp = await dynamodbConnector.getTask(id);
  const task = resp.Item;
  await dynamodbConnector.updateTaskState(id, state);

  let evt = {
    id: id,
    state: state,
  };
  await taskUpdateStateSendEvent(evt, context);
  uiRefresh("tasks", task.data);
  return { id, state };
};
