/**
 * create case from dropdown menu with list of case definitions.
 * @author tchen@bellhop.io
 * @function CreateCase
 **/
import React, { useEffect } from "react";
import apiWrapper from "../libs/api-wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
//import { CaseDefContext } from "../context/caseDef-context";
// import { getCaseDefList } from "../models/caseDef-backend";

import { connect, setStore } from "react-context-global-store";

const CreateCase = ({
  className,
  user,
  cases,
  setCases,
  tasks,
  setTasks,
  setCurrentTask,
  setCurrentCaseId,
  store,
}) => {
  useEffect(() => {
    apiWrapper.get("/case-definitions").then((resp) => {
      setStore({
        caseDefinitions: {
          caseDefinitions: resp.data,
        },
      });
    });
  }, []);

  // const [state, dispatch] = useContext(CaseDefContext);
  const { caseDefinitions } = store.caseDefinitions;
  const { currentUser, users } = store.user;
  const caseDefinitionItems = caseDefinitions.map((caseDefinition) => (
    <Dropdown.Item
      eventKey="1"
      onClick={(e) => createCase(caseDefinition)}
      key={caseDefinition.id}
    >
      <FontAwesomeIcon icon={caseDefinition.data.icon || "cog"} />
      <span> {caseDefinition.data.name}</span>
    </Dropdown.Item>
  ));

  async function createCase(caseDefinition) {
    let caseInstance = caseDefinition.data;
    caseInstance.owner = currentUser.username;
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
        <Dropdown.Menu>{caseDefinitionItems}</Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default connect(CreateCase, ["user", "caseDefinitions"]);
