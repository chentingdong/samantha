import React from "react";

/**
 * @author tchen@bellhop.io
 * @function IntakeForm
 **/

const IntakeFormDesign = ({ task, setTask, data }) => {
  return (
    <div className="form-group col-12">
      <label>{data.title}</label>
      <br />
      <input
        className="form-control"
        type="url"
        name="formUrl"
        placeholder="form url"
        value={data.urls[0]}
        onChange={setTask}
      />
    </div>
  );
};

const IntakeFormRun = ({ task }) => {
  return task.formUrl && <a href={task.formUlr}>task.formUrl</a>;
};

export { IntakeFormDesign, IntakeFormRun };
