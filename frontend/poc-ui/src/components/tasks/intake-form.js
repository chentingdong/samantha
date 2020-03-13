import React from 'react';

/**
* @author tchen@bellhop.io
* @function IntakeForm
**/

const IntakeFormDesign = ( {task, setTask} ) => {
  return (
    <div className="form-group col-12">
      <label>1. Attach form</label><br />
      <input className="form-control"
        type="url"
        name="formUrl"
        placeholder="form url"
        value={ task.formUrl }
        onChange={ setTask } />
    </div>
  );
};

const IntakeFormRun = ( { task } ) => {
  return (
    task.formUrl &&
    <a href={ task.formUlr }>task.formUrl</a>
  )
}

export { IntakeFormDesign, IntakeFormRun};