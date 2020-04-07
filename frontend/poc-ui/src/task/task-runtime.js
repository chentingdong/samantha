import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import apiWrapper from "../libs/api-wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * @author tchen@bellhop.io
 * @function TaskRuntime
 **/

const TaskRuntime = ({
  currentCaseId,
  currentTask,
  setCurrentTask,
  tasks,
  setTasks,
  showRuntimeModal,
  setShowRuntimeModal,
}) => {
  function close() {
    setShowRuntimeModal(false);
  }

  async function reopenCurrentTask() {
    if (currentTask.state === "Complete") updateCurrentTaskState("Active");
    close();
  }

  async function deleteCurrentTask() {
    const path = `/tasks/${currentTask.id}`;
    let deletedTask = await apiWrapper.delete(path);
    tasks.splice(deletedTask, 1);
    close();
  }

  async function updateCurrentTaskState(state) {
    let path = `/tasks/${currentTask.id}/${state}`;
    await apiWrapper.patch(path);
    close();
    setCurrentTask({});
  }

  return (
    <div>
      <Modal show={showRuntimeModal} onHide={close} size="lg">
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
          <p>Manually update the status of this task, {currentTask.id}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-light" onClick={close}>
            <FontAwesomeIcon icon="times" />
            <span className="pl-1">cancel</span>
          </button>
          <button className="btn btn-danger" onClick={deleteCurrentTask}>
            <FontAwesomeIcon icon="trash-alt" />
            <span className="pl-1">abandon</span>
          </button>
          <button className="btn btn-warning" onClick={reopenCurrentTask}>
            <FontAwesomeIcon icon="redo" />
            <span className="pl-1">reopen</span>
          </button>
          <button
            className="btn btn-green"
            onClick={(e) => updateCurrentTaskState("Active")}
          >
            <FontAwesomeIcon icon="tasks" />
            <span className="pl-1">start</span>
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
