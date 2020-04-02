import React from 'react';

/**
* @author tchen@bellhop.io
* @function AskApproval
**/

const AskApprovalDesign = ( { task, setTask } ) => {
  return (
    <div className="form-group col-12">
      <label>2. Button text</label><br />
      <input
        className="form-control"
        value="Ask for approval"
        onChange={ setTask }
      />
    </div>
  );
};

const AskApprovalRun = ( { task } ) => {
  return (
    <div>
      <div className="btn btn-light" >Ask for approval</div>
    </div>
  );
};
export { AskApprovalDesign, AskApprovalRun };