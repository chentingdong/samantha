import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import apiWrapper from "../libs/api-wrapper";
import CreateTask from "./create-task";
import DesignTask from "./design-task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { stateColor, formatDate, stateIcon } from "../libs/custom-functions";
import CaseHeader from "../case/case-header";

function Tasks({ currentCaseId, user }) {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentCase, setCurrentCase] = useState("");
  const [currentTask, setCurrentTask] = useState({});
  const [designTaskModal, setDesignTaskModal] = useState(false);
  const [showWorkOnTaskModal, setShowWorkOnTaskModal] = useState(false);

  useEffect(() => {
    apiWrapper.get("/users").then((resp) => {
      setUsers(resp.data);
    });
  }, []);

  useEffect(() => {
    async function getCaseTasks() {
      let path = `/cases/${currentCaseId}/tasks`;
      try {
        let resp = await apiWrapper.get(path);
        let caseTasks = resp.data;
        setTasks(caseTasks);
      } catch (err) {
        console.error(err);
      }
    }

    getCaseTasks();
  }, [currentCaseId]);

  useEffect(() => {
    async function getCurrentCase() {
      try {
        const path = "/cases/" + currentCaseId;
        let resp = await apiWrapper.get(path);
        if (resp.data.data) setCurrentCase(resp.data.data);
      } catch (err) {
        console.error(err);
      }
    }
    getCurrentCase();
  }, [currentCaseId]);

  function getUserAttribute(username, attr) {
    try {
      let user = users.filter((u) => {
        return u.username === username;
      });
      if (user.length === 1) return user[0].attributes[attr];
    } catch (err) {
      console.error("Error getting user attribute: ", err);
    }
  }

  function editTask(task) {
    setDesignTaskModal(true);
    setCurrentTask(task);
  }

  function workOnTask(task) {
    setShowWorkOnTaskModal(true);
    setCurrentTask(task);
    console.debug(JSON.stringify(task));
  }

  async function deleteCurrentTask() {
    const path = `/tasks/${currentTask.id}`;
    await apiWrapper.delete(path);
    tasks.splice(currentTask, 1);
    setShowWorkOnTaskModal(false);
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
    setShowWorkOnTaskModal(false);
  }

  function reopenCurrentTask() {
    if (currentTask.state === "Complete") updateCurrentTaskState("Active");
  }

  return (
    currentCase && (
      <div className="">
        <CaseHeader currentCaseId={currentCaseId} tasks={tasks} />
        <div className="card mt-4">
          <div className="d-flex pt-2 pb-2">
            <h4 className="col-6">Tasks</h4>
            <div className="col-6 text-right">
              <CreateTask
                user={user}
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
                setDesignTaskModal={setDesignTaskModal}
              />
            </div>
          </div>

          <table className="col-12 tasks">
            <tbody>
              <tr className="bg-light">
                <th className="p-2">Task title</th>
                <th>Due Date</th>
                <th>Assigned to</th>
                <th>Status</th>
              </tr>
              {tasks.length > 0 &&
                tasks.map((task) => {
                  const color = stateColor(task.state);
                  return (
                    <tr key={task.id} className="border-bottom border-light">
                      <td
                        className={`p-2 pt-4 pb-4 clickable text-primary border-left border-${color}`}
                        onClick={(e) => editTask(task)}
                      >
                        {task.data.name}
                      </td>
                      <td>{formatDate(task.data.dueDate)}</td>
                      <td>
                        {task.data.participants &&
                          task.data.participants.map((participant) => {
                            return (
                              <img
                                className="thumbnail rounded-circle"
                                key={participant}
                                src={getUserAttribute(participant, "picture")}
                                alt={getUserAttribute(participant, "name")}
                              />
                            );
                          })}
                      </td>
                      <td className={`border-right border-${color}`}>
                        <div
                          className={`text-${color} badge badge-pill border border-${color} shadow-sm btn btn-light`}
                          onClick={(e) => workOnTask(task)}
                        >
                          <FontAwesomeIcon icon={stateIcon(task.state)} />
                          <span className="pl-1">{task.state}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <DesignTask
          currentCaseId={currentCaseId}
          currentTask={currentTask}
          users={users}
          tasks={tasks}
          setTasks={setTasks}
          close={(e) => setDesignTaskModal(false)}
        />
        currentTask &&
        <Modal show={designTaskModal} onHide={(e) => setDesignTaskModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              Edit task
              <b>
                {currentTask.data
                  ? currentTask.data.name
                  : JSON.stringify(currentTask.data)}
              </b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <pre>{JSON.stringify(currentTask.data, null, 2)}</pre>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn-light"
              onClick={(e) => setDesignTaskModal(false)}
            >
              cancel
            </button>
            <button
              className="btn-light"
              onClick={(e) => setDesignTaskModal(false)}
            >
              save
            </button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showWorkOnTaskModal}
          onHide={(e) => setShowWorkOnTaskModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <b>
                {" "}
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
            <button
              className="btn btn-light"
              onClick={(e) => setShowWorkOnTaskModal(false)}
            >
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
    )
  );
}

export default Tasks;
