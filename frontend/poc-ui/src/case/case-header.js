import React, { useState, useEffect } from "react";
import apiWrapper from "../libs/api-wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "react-bootstrap/ProgressBar";
import { formatDate } from "../libs/custom-functions";

/**
 * @author tchen@bellhop.io
 * @function CaseHeader
 **/

const CaseHeader = ({ currentCaseId, tasks }) => {
  const [currentCase, setCurrentCase] = useState({});
  const taskProgress = 60;

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
            <FontAwesomeIcon icon="info-circle" />
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
        </div>
      </div>
    )
  );
};

export default CaseHeader;
