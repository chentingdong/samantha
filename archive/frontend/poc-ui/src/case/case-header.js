/**
 * substantial design task area header. Mar, 2020.
 * @author tchen@bellhop.io
 * @function CaseHeader
 **/
import React, { useState, useEffect, forwardRef } from "react";
import apiWrapper from "../libs/api-wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Modal } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { formatDate } from "../libs/custom-functions";
import SaveCaseDefinition from "./save-caseDef";

const CaseHeader = ({ currentCaseId, tasks }) => {
  const [currentCase, setCurrentCase] = useState({});
  const [taskProgress, setTaskProgress] = useState(60);
  const [showDefModal, setShowDefModal] = useState(false);

  function saveCaseAsDefinition() {
    console.log("saving currentCase.....");
    setShowDefModal(true);
  }
  function completeCase() {
    //let today = new Date();
    console.log(currentCase);
  }
  function cancelCase() {
    //let today = new Date();
    console.log(currentCase);
  }

  useEffect(() => {
    async function getCurrentCase() {
      const path = "/cases/" + currentCaseId;
      let resp = await apiWrapper.get(path);
      if (resp.data.data) setCurrentCase(resp.data.data);
    }
    getCurrentCase();
  }, [currentCaseId]);

  useEffect(() => {
    function updateProgress() {
      let completedTasks = tasks.filter((task) => task.state === "Complete");
      let percentage = (completedTasks.length / tasks.length) * 100;
      percentage = +percentage.toFixed(1);
      setTaskProgress(percentage);
    }

    updateProgress();
  }, [tasks]);

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
              <Dropdown.Toggle
                id="dropdown-custom-components"
                className="btn-light"
              >
                <FontAwesomeIcon icon="save" className="text-primary" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  eventKey="1"
                  active
                  onClick={(e) => completeCase()}
                >
                  complete
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={(e) => cancelCase()}>
                  cancel
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="3"
                  onClick={(e) => saveCaseAsDefinition()}
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
          />
        </div>
      </div>
    )
  );
};

export default CaseHeader;
