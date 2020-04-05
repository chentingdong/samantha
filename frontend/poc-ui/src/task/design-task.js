// This is a designtime component, but also used in runtime design.
import React from "react";
import DatePicker from "react-datepicker";
import { Modal } from "react-bootstrap";
import LoaderButton from "../components/loader-button";
import { useFormFields } from "../libs/custom-hooks";
import apiWrapper from "../libs/api-wrapper";
import { IntakeFormDesign, IntakeFormRun } from "./tasks/intake-form";
import { AskApprovalDesign, AskApprovalRun } from "./tasks/ask-approval";

function DesignTask({
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
      className="container-fluid"
      show={showDesignModal}
      onHide={(e) => setShowDesignModal(false)}
      key={currentTask.id}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>{currentTask.name}</h3>
          <h6>{currentTask.description}</h6>
        </Modal.Title>
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
  const [task, setTask] = useFormFields(currentTask);

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
    <form onSubmit={(e) => e.preventDefault()} className="row">
      <h5 className="col-12">General task fields</h5>
      <hr />
      <div className="form-group col-6">
        <label>Task Name</label>
        <input
          className="form-control"
          name="name"
          value={task.name}
          onChange={setTask}
        />
      </div>
      <div className="form-group col-6">
        <label>Depend on task</label>
        <select
          className="form-control"
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
      <div className="form-group col-12">
        <label>Task description</label>
        <textarea
          className="form-control"
          name="description"
          value={task.description}
          placeholder="Please fill in this form..."
          onChange={setTask}
        />
      </div>
      <hr />
      <div className="form-group col-12">
        <label>Add participants </label>
        <br />
        <select
          className="form-control"
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
      <div className="form-group col-6">
        <label>Due date</label>
        <br />
        <DatePicker
          className="form-control"
          name="dueDate"
          selected={task.dueDate}
          onChange={setTask}
        />
      </div>
      <div className="form-group col-6 row">
        <label className="col-12">Remind in days</label>
        <input
          className="form-control col-7"
          type="number"
          name="followUpDays"
          value={parseInt(task.followUpDays)}
          onChange={setTask}
        />
        <span className="col-5">days</span>
      </div>
      <hr />
      <h5 className="col-12">TODO: task management:</h5>
      <hr />
      <IntakeFormDesign task={task} setTask={setTask}></IntakeFormDesign>
      <AskApprovalDesign task={task} setTask={setTask}></AskApprovalDesign>

      <div className="modal-footer col-12">
        <button className="btn-secondary" onClick={close}>
          Cancel
        </button>
        <LoaderButton className="btn-success" onClick={(e) => handleSubmit(e)}>
          create task!
        </LoaderButton>
      </div>
    </form>
  );
}

export default DesignTask;
