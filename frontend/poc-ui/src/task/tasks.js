import React, { useState, useEffect } from "react";
import apiWrapper from "../libs/api-wrapper";
import CreateTask from "./create-task";
import DesignTask from "./task-design";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  stateColor,
  formatDateTime,
  stateIcon,
} from "../libs/custom-functions";
import CaseHeader from "../case/case-header";
import TaskRuntime from "../task/task-runtime";

function Tasks({ currentCaseId, lastMessage, user }) {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentCase, setCurrentCase] = useState("");
  const [currentTask, setCurrentTask] = useState({});
  const [showDesignModal, setShowDesignModal] = useState(false);
  const [showRuntimeModal, setShowRuntimeModal] = useState(false);

  useEffect(() => {
    apiWrapper.get("/users").then((resp) => {
      setUsers(resp.data);
    });
  }, []);

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

  useEffect(() => {
    getCaseTasks();
  }, [currentCaseId]);

  useEffect(() => {
    if (lastMessage) {
      let data = JSON.parse(lastMessage.data);
      if (data.type === "REFRESH" && data.target === "tasks") {
        getCaseTasks();
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    async function getCurrentCase() {
      try {
        const path = "/cases/" + currentCaseId;
        let resp = await apiWrapper.get(path);
        if (resp.data) setCurrentCase(resp.data);
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
    setCurrentTask(task);
    setShowDesignModal(true);
  }

  function workOnTask(task) {
    setCurrentTask(task);
    setShowRuntimeModal(true);
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
                currentCaseId={currentCaseId}
                user={user}
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
                setShowDesignModal={setShowDesignModal}
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
                      <td>{formatDateTime(task.data.dueDate)}</td>
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
          setCurrentTask={setCurrentTask}
          users={users}
          tasks={tasks}
          setTasks={setTasks}
          showDesignModal={showDesignModal}
          setShowDesignModal={setShowDesignModal}
        />
        <TaskRuntime
          currentCaseId={currentCaseId}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          tasks={tasks}
          setTasks={setTasks}
          showRuntimeModal={showRuntimeModal}
          setShowRuntimeModal={setShowRuntimeModal}
        />
      </div>
    )
  );
}

export default Tasks;
