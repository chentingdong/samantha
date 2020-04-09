import React from "react";

/**
 * @author tchen@bellhop.io
 * @function AskApproval
 **/

const AskApprovalDesign = ({ task, setTask, planItemIndex }) => {
  const data = task.planItems[planItemIndex].data;

  return (
    <div className="form-group col-12">
      <input
        className="mr-2"
        type="checkbox"
        id="preApprove"
        checked={data.checked}
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
