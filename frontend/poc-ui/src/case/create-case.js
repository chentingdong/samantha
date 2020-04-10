/**
 * @author
 * @function CreateCase
 **/
import React, { useState, useEffect } from "react";
import apiWrapper from "../libs/api-wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";

const CreateCase = ({
  className,
  user,
  cases,
  setCases,
  tasks,
  setTasks,
  setCurrentTask,
  currentCaseId,
  setCurrentCaseId,
  currentCaseStatus,
  setCurrentCaseStatus,
}) => {
  const [caseDefinitions, setCaseDefinitions] = useState([]);

  useEffect(() => {
    function listCaseDefinitions() {
      let path = "/case-definitions";
      apiWrapper
        .get(path)
        .then((resp) => {
          setCaseDefinitions(resp.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    listCaseDefinitions();
  }, [currentCaseStatus, setCurrentCaseStatus]);

  async function createCase(caseDefinition) {
    let caseInstance = caseDefinition.data;
    caseInstance.owner = user.username;
    caseInstance.participants = [];
    caseInstance.createdAt = Date.now();

    let resp = await apiWrapper.post("/cases", caseInstance);
    if (resp.status === 200) {
      let newCase = resp.data;
      setCases((cases) => {
        return [newCase, ...cases];
      });
      setCurrentCaseId(newCase.id);
      caseInstance.id = newCase.id;
    }
    // loop through caseDef planItems and create tasks for new case

    caseInstance.planItems.map((planItem) => {
      console.log("planItem");
      console.log(planItem);
      let taskInstance = planItem.data;
      taskInstance.caseId = caseInstance.id;
      taskInstance.owner = user.username;
      let today = new Date();
      let tomorrow = today.setDate(today.getDate() + 1);
      taskInstance.dueDate = tomorrow;
      createCaseTasks(taskInstance);
    });

    async function createCaseTasks(taskInstance) {
      let path = `/cases/${caseInstance.id}/tasks`;
      let resp = await apiWrapper.post(path, taskInstance);
      let t = resp.data;
      setCurrentTask(t);
      console.log(tasks);
      setTasks((tasks) => [t, ...tasks]);
    }
  }

  return (
    <div className="create-case">
      <Dropdown>
        <Dropdown.Toggle className={className}>
          <FontAwesomeIcon icon="plus" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {caseDefinitions.length > 0 &&
            caseDefinitions.map((caseDefinition) => {
              return (
                <Dropdown.Item
                  eventKey="1"
                  onClick={(e) => createCase(caseDefinition)}
                  key={caseDefinition.id}
                >
                  <FontAwesomeIcon icon={caseDefinition.data.icon || "cog"} />
                  <span> {caseDefinition.data.name}</span>
                </Dropdown.Item>
              );
            })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default CreateCase;
