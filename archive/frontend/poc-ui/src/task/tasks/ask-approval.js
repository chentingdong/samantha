/**
 * task definition template.
 **/
import React from "react";

const AskApprovalDesign = ({ task, setTask, planItemIndex }) => {
  const data = task.planItems[planItemIndex].data;
  function doSomething() {}
  return (
    <div className="form-group col-12">
      <input
        className="mr-2"
        type="checkbox"
        id="preApprove"
        checked={data.checked}
        onChange={doSomething}
      />
      <label htmlFor="preApprove">{data.title}</label>
    </div>
  );
};

const AskApprovalRun = ({ task }) => {
  return (
    <div>
      <div className="btn btn-light">Ask for approval</div>
    </div>
  );
};
export { AskApprovalDesign, AskApprovalRun };
