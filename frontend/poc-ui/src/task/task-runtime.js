import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import apiWrapper from "../libs/api-wrapper";

/**
 * @author tchen@bellhop.io
 * @function TaskRuntime
 **/

const TaskRuntime = ({
  currentTask,
  setCurrentTask,
  tasks,
  setTasks,
  showRuntimeModal,
  setShowRuntimeModal,
}) => {
  const [show, setShow] = useState(false);

  function close() {
    setShowRuntimeModal(false);
  }
  function reopenCurrentTask() {
    if (currentTask.state === "Complete") updateCurrentTaskState("Active");
  }

  async function deleteCurrentTask() {
    const path = `/tasks/${currentTask.id}`;
    await apiWrapper.delete(path);
    tasks.splice(currentTask, 1);
    close();
  }

  async function updateCurrentTaskState(state) {
    // User manually complete the task by clicking the complete button
    let path = `/tasks/${currentTask.id}/${state}`;
    let resp = await apiWrapper.patch(path);
    setCurrentTask({ [state]: resp.data.state, ...currentTask });

    // update currentTask in tasks listing
    setTasks((tasks) => {
      let updatedTasks = tasks;
      let currTask = updatedTasks.filter((t) => t.id === currentTask.id)[0];
      currTask.state = resp.data.state;
      return updatedTasks;
    });
    close();
  }

  return (
    <div>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>
              {currentTask.data
                ? currentTask.data.name
                : JSON.stringify(currentTask.data)}
            </b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Manually update the status of this task.</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-light" onClick={(e) => close}>
            no change
          </button>
          <button className="btn btn-secondary" onClick={deleteCurrentTask}>
            abandon task
          </button>
          <button className="btn btn-secondary" onClick={reopenCurrentTask}>
            reopen task
          </button>
          <button
            className="btn btn-secondary"
            onClick={(e) => updateCurrentTaskState("Active")}
          >
            start task
          </button>
          <button
            className="btn btn-success"
            onClick={(e) => updateCurrentTaskState("Complete")}
          >
            complete task
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskRuntime;
