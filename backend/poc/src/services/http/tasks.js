const dynamodbConnector = require("../../connectors/dynamodb");
const uuid = require("uuid");
const {
  taskCreateBroadcastToOwner,
  taskTransitionNoticeParticipants,
} = require("../../core/task-templates");
const { addCaseParticipantToDb } = require("./cases");
const { taskCompleteSendEvent } = require("../../core/events-handler");

module.exports.createTask = async (event, context) => {
  const id = uuid.v4();
  const { caseId } = event.path;
  const task = event.body;

  const { Item = {} } = await dynamodbConnector.getCase(caseId);
  const caseData = Item.data;

  // create task
  let state = task.dependsOns.length === 0 ? "Active" : "Pending";
  await dynamodbConnector.createTaskInCase(id, caseId, state, task);

  // add task to case planItems.
  caseData.planItems.push({
    id,
    ...task,
  });

  await dynamodbConnector.updateCaseData(caseId, caseData);

  // add participant to case participants
  await addCaseParticipantToDb(caseId, task.participants);

  // notification
  await taskCreateBroadcastToOwner(caseId, task);
  return { id, state, caseId, data: task };
};

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
    body: {
      id: id,
      state: state,
    },
  };
  let resp = await taskCompleteSendEvent(evt, context);
  console.log(`sent to sqs: ${JSON.stringify(resp)}`);

  return { id, state };
};
