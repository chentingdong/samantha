// This is a designtime component, but also used in runtime design.
import React from "react";
import DatePicker from "react-datepicker";
import { Modal } from "react-bootstrap";
import LoaderButton from "../components/loader-button";
import { useFormFields } from "../libs/custom-hooks";
import apiWrapper from "../libs/api-wrapper";
import { IntakeFormDesign, IntakeFormRun } from "./tasks/intake-form";
import { AskApprovalDesign, AskApprovalRun } from "./tasks/ask-approval";

function TaskDesign({
  currentCaseId,
  currentTask,
  setCurrentTask,
  users,
  tasks,
  setTasks,
  showDesignModal,
  setShowDesignModal,
}) {
  return (
    <Modal
      show={showDesignModal}
      size="xl"
      onHide={(e) => setShowDesignModal(false)}
      key={currentTask.id}
    >
      <Modal.Header closeButton>
        <h4>Task designer</h4>
      </Modal.Header>
      <Modal.Body>
        <TaskForm
          currentCaseId={currentCaseId}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          users={users}
          tasks={tasks}
          setTasks={setTasks}
          setShowDesignModal={setShowDesignModal}
        />
      </Modal.Body>
    </Modal>
  );
}

function TaskForm({
  currentCaseId,
  currentTask,
  setCurrentTask,
  users,
  tasks,
  setTasks,
  setShowDesignModal,
}) {
  const [task, setTask] = useFormFields(currentTask.data);

  function close() {
    setShowDesignModal(false);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const valid = validateForm();
    if (valid) submitForm();
  }

  function validateForm() {
    if (task.participants.length === 0) {
      alert("Please add at one or more participants.");
      return false;
    }

    return true;
  }

  async function submitForm() {
    let path = `/cases/${currentCaseId}/tasks`;
    let resp = await apiWrapper.post(path, task);
    let t = resp.data;
    setCurrentTask(t);
    setTasks((tasks) => [t, ...tasks]);
    close();
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="d-flex card-header">
        <div className="flex-fill p-2">
          <div className="form-group">
            <label>Task Name</label>
            <input
              className="form-control"
              name="name"
              value={task.name}
              onChange={setTask}
            />
          </div>
          <div className="form-group">
            <label>Task description</label>
            <textarea
              className="form-control"
              name="description"
              value={task.description}
              placeholder="Please fill in this form..."
              onChange={setTask}
            />
          </div>
        </div>
        <div className="flex-fill p-2">
          <div className="form-group">
            <label className="d-block">Due date</label>
            <DatePicker
              className="form-control"
              name="dueDate"
              selected={task.dueDate}
              onChange={setTask}
            />
          </div>
          <div className="form-group">
            <label>Remind in days</label>
            <input
              className="form-control"
              type="number"
              name="followUpDays"
              value={parseInt(task.followUpDays || "1")}
              onChange={setTask}
            />
          </div>
        </div>
        <div className="form-group flex-fill p-2">
          <label>Depend on task</label>
          <select
            className="form-control"
            style={{ height: "calc(100% - 30px)" }}
            multiple
            name="dependsOns"
            value={task.dependsOns}
            onChange={setTask}
          >
            {tasks.map((task) => {
              return (
                <option value={task.id} key={task.id}>
                  {task.data.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group p-2">
          <label>Add participants </label>
          <br />
          <select
            className="form-control"
            style={{ height: "calc(100% - 30px)" }}
            required
            multiple
            name="participants"
            value={task.participants}
            onChange={setTask}
          >
            {users.map((user) => {
              return (
                <option value={user.username} key={user.username}>
                  {user.attributes.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="d-flex card-body">
        <h5>task content:</h5>
        {task.planItems &&
          task.planItems.forEach((item, index) => {
            const TagName = item.tagName;
            return (
              <div>
                {index}
                <TagName
                  exact
                  key={`planItems-${index}`}
                  task={task}
                  setTask={setTask}
                  data={item.data}
                />
              </div>
            );
          })}
      </div>

      <div className="modal-footer">
        <button className="btn-secondary" onClick={close}>
          Cancel
        </button>
        <LoaderButton className="btn-success" onClick={(e) => handleSubmit(e)}>
          create/update task!
        </LoaderButton>
      </div>
    </form>
  );
}

export default TaskDesign;
