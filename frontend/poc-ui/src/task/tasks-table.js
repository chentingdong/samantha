/**
 * tasks list view.
 **/
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  stateColor,
  formatDateTime,
  stateIcon,
} from "../libs/custom-functions";

const TasksTable = ({
  tasks,
  setTasks,
  users,
  setCurrentTask,
  setShowDesignModal,
  setShowRuntimeModal,
}) => {
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
    <div>
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
  );
};

export default TasksTable;
