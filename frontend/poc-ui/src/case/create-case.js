/**
 * @author
 * @function CreateCase
 **/
import React, { useState, useEffect } from "react";
import apiWrapper from "../libs/api-wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";

const CreateCase = ({ user, className, cases, setCases, setCurrentCaseId }) => {
  const [caseDefinitions, setCaseDefinitions] = useState([]);

  useEffect(() => {
    function getCaseDefinitions() {
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

    getCaseDefinitions();
  }, []);

  async function createCase(caseDefinition) {
    let caseInstance = caseDefinition.data;
    caseInstance.owner = user.username;
    caseInstance.participants = [];
    caseInstance.createdAt = Date.now();

    let resp = await apiWrapper.post("/cases", caseInstance);
    if (resp.status === 200) {
      let newCase = await resp.data;
      setCases((cases) => {
        return [newCase, ...cases];
      });

      setCurrentCaseId(newCase.id);
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
