// This is a designtime component, but also used in runtime design.
import React from 'react';
import DatePicker from 'react-datepicker';
import LoaderButton from './loader-button';
import {useFormFields} from '../libs/custom-hooks'

function CreateFormTaskForm ( { newTask, close, submitCreateTaskForm, users } ) {
  const [ task, setTask ] = useFormFields( newTask )

  function submit () {
    submitCreateTaskForm(task)
  }

  return (
    task &&
    <form onSubmit={e => e.preventDefault()} className="row">
      <div className="form-group col-6">
        <label>Task Name</label>
        <input className="form-control" name="name" value={task.name} onChange={setTask} />
      </div>
      <div className="form-group col-6">
        <label>Depend on task</label>
        <input className="form-control" name="dependsOn" value={task.dependsOn} onChange={setTask} />
      </div>
      <div className="form-group col-12">
        <label>Task description</label>
        <textarea className="form-control"
          name="description"
          value={task.description}
          placeholder="Please fill in this form..."
          onChange={setTask} />
      </div>
      <hr />
      <div className="form-group col-12">
        <label>Assign to</label><br />
        <select className="form-control"
          name="assignee"
          value={task.assignee}
          onChange={setTask} >
          {users.map( ( user ) => {
            return <option value={user.IdentityId} key={user.IdentityId}>{user.IdentityId}</option>;
          } )}
        </select>
      </div>
      <div className="form-group col-6">
        <label>Due date</label><br />
        <DatePicker className="form-control"
          name="dueDate"
          selected={task.dueDate}
          onChange={setTask}
        />
      </div>
      <div className="form-group col-6 row">
        <label className="col-12">Remind in days</label>
        <input className="form-control col-7"
          type="number"
          name="followUpDuration"
          value={parseInt(task.followUpDuration)}
          onChange={setTask} />
        <span className="col-5">days</span>
      </div>
      <hr />
      <div className="form-group col-12">
        <label className="block">Attach form</label><br />
        <input className="form-control"
          type="url"
          name="formUrl"
          placeholder="form url"
          value={task.formUrl}
          onChange={setTask} />
      </div>
      <div className="modal-footer col-12">
        <button className="btn-secondary" onClick={close}>Cancel</button>
        <LoaderButton className="btn-success" onClick={submit}>create task!</LoaderButton>
      </div>
    </form>
  );
}

export default CreateFormTaskForm;