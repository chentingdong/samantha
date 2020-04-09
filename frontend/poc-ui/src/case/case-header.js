import React, { useState, useEffect } from "react";
import apiWrapper from "../libs/api-wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Modal } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { formatDate } from "../libs/custom-functions";
import SaveCaseDefinition from "./save-caseDef";

/**
 * @author tchen@bellhop.io
 * @function CaseHeader
 **/

const CaseHeader = ({
  currentCaseId,
  tasks,
  currentCaseStatus,
  setCurrentCaseStatus,
}) => {
  const [currentCase, setCurrentCase] = useState({});
  const taskProgress = 60;
  const [showDefModal, setShowDefModal] = useState(false);
  const caseOptions = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      &#x25bc;
      {children}
    </a>
  ));

  function saveCaseAsDefinition(currentCase) {
    console.log("saving currentCase.....");
    setShowDefModal(true);
  }
  function completeCase(currentCase) {
    //let today = new Date();
    console.log(currentCase);
  }
  function cancelCase(currentCase) {
    //let today = new Date();
    console.log(currentCase);
  }

  useEffect(() => {
    const path = "/cases/" + currentCaseId;
    apiWrapper
      .get(path)
      .then((resp) => {
        if (resp.data.data) setCurrentCase(resp.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentCaseId]);

  return (
    currentCase !== {} && (
      <div>
        <div className="row mt-2 p-2">
          <div className="col-2">
            <FontAwesomeIcon icon="angle-left" />
            <span className="pl-1">Back</span>
          </div>
          <h4 className="col-8 text-center">{currentCase.name}</h4>
          <div className="col-2 text-right">
            <Dropdown>
              <Dropdown.Toggle as={caseOptions} id="dropdown-custom-components">
                <FontAwesomeIcon icon="info-circle" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  eventKey="1"
                  active
                  onClick={(e) => completeCase(currentCase)}
                >
                  complete
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={(e) => cancelCase(currentCase)}
                >
                  cancel
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="3"
                  onClick={(e) => saveCaseAsDefinition(currentCase)}
                >
                  save
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <hr className="row" />
        <div className="row">
          <div className="col-12">
            <h3 className="d-inline-block mr-2">{currentCase.name}</h3>
            <FontAwesomeIcon
              className="text-primary border-bottom"
              icon="pen"
            />
          </div>
          <div className="col-12">Deadline: {formatDate(Date.now())}</div>
          <div className="col-5">
            {tasks.length} &nbsp; Tasks
            <span className="p-1"> &#x2022; </span>
            {currentCase.participants ? currentCase.participants.length : ""}
            &nbsp; People
          </div>
          <div className="col-7">
            <ProgressBar
              className=""
              variant="light-gray"
              label={`${taskProgress}%`}
              now={taskProgress}
            />
          </div>
          <SaveCaseDefinition
            currentCase={currentCase}
            tasks={tasks}
            showDefModal={showDefModal}
            setShowDefModal={setShowDefModal}
            currentCaseStatus={currentCaseStatus}
            setCurrentCaseStatus={setCurrentCaseStatus}
          />
        </div>
      </div>
    )
  );
};

export default CaseHeader;
