import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import apiWrapper from "../libs/api-wrapper";

/**
 * @author tchen@bellhop.io
 * @function NewTask
 **/

const CreateTask = ({
  currentCaseId,
  user,
  currentTask,
  setCurrentTask,
  setShowDesignModal,
}) => {
  const [taskDefinitions, setTaskDefinitions] = useState([]);

  function listTaskDefinitions() {
    let path = "/task-definitions";
    apiWrapper
      .get(path)
      .then((resp) => {
        setTaskDefinitions(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function createTask(taskDefinition) {
    setShowDesignModal(true);
    let today = new Date();
    let tomorrow = today.setDate(today.getDate() + 1);
    let taskInstance = Object.assign({}, taskDefinition);
    taskInstance.caseId = currentCaseId;
    taskInstance.data.owner = user.username;
    taskInstance.data.dueDate = tomorrow;
    setCurrentTask(taskInstance);
  }

  useEffect(() => {
    listTaskDefinitions();
  }, []);

  return (
    currentCaseId !== undefined &&
    taskDefinitions.length > 0 && (
      <Dropdown>
        <Dropdown.Toggle variant="light border-secondary shadow-sm">
          <FontAwesomeIcon icon="plus-circle" />
          <span className="ml-1">New Task</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {taskDefinitions.map((taskDefinition) => {
            return (
              <Dropdown.Item
                eventKey="1"
                key={taskDefinition.id}
                onClick={(e) => createTask(taskDefinition)}
              >
                <FontAwesomeIcon icon={taskDefinition.data.icon || "cog"} />
                <span> {taskDefinition.data.name}</span>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    )
  );
};

export default CreateTask;
