import React from 'react';

/**
* @author tchen@bellhop.io
* @function AskApproval
**/

const AskApprovalDesign = ( { task, setTask } ) => {
  return (
    <div className="form-group col-12">
      <label>2. Button text</label><br/>
      <input
        className="form-control"
        value="Ask for approval from assignee"
        onChange={ setTask}
      />
    </div>
  );
};

const AskApprovalRun = ( { task } ) => {
  return (
    <div>
      <div className="btn btn-light" >Ask for approval from assignee</div>
    </div>
  );
};
export { AskApprovalDesign, AskApprovalRun};