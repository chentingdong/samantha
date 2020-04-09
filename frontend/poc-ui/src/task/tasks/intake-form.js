import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * @author tchen@bellhop.io
 * @function IntakeForm
 **/

const IntakeFormDesign = ({ task, setTask, planItemIndex }) => {
  const initUrls = task.planItems[planItemIndex].data.urls || [];
  const [urls, setUrls] = useState(initUrls);

  function add() {
    setUrls((urls) => [...urls, ""]);
  }
  function remove(index) {
    const updated = [...urls];
    updated.splice(index, 1);
    setUrls(updated);
  }
  return (
    <div className="form-group col-12">
      <div className="d-flex">
        <span>add a form </span>
        <span className="clickable ml-2" onClick={add}>
          <FontAwesomeIcon icon="plus" />
        </span>
      </div>
      {urls.map((url, index) => {
        return (
          <div className="row" key={index}>
            <span className="col-11">
              <input
                className="form-control mb-2"
                type="url"
                name="formUrl"
                placeholder="Add url to a new form..."
                value={url}
              />
            </span>
            <span className="col-1 clickable" onClick={(e) => remove(index)}>
              <FontAwesomeIcon icon="times" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

const IntakeFormRun = ({ task }) => {
  return task.formUrl && <a href={task.formUlr}>task.formUrl</a>;
};

export { IntakeFormDesign, IntakeFormRun };
