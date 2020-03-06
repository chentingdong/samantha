// This is a designtime component, but also used in runtime design.
import React from 'react';
import DatePicker from 'react-datepicker';
import { useFormFields } from '../libs/custom-hooks';
import LoaderButton from './loader-button';
import { formatDate } from '../libs/custom-functions';

function CreateApprovalTask ( props ) {
  // TODO: cognito user api
  const assigneeList = [
    { name: 'Baiji', id: 'Baiji' },
    { name: 'Ben', id: 'Ben' },
    { name: 'Jin', id: 'Jin' },
    { name: 'Ronda', id: 'Ronda' },
    { name: 'Tingdong', id: 'Tingdong' }
  ];

  // TODO: default form task schema should come from an api.
  const [ task, setTask ] = useFormFields( {
    taskDescription: '',
    assignee: assigneeList[ 1 ],
    dueDate: new Date(),
    followUpDays: 1,
    formUrl: ''
  } );

  function AfterPostMessage () {
    const dueDate = formatDate( task.dueDate );
    return (
      <span>
        Your task is added to current case.
        Your message is sent to <b>{task.assignee.name}</b>,
        expecting to finish on <b>{dueDate}</b>.
        I will inform him after <b>{task.followUpDays}</b> days if not finished.
      </span>
    );
  }

  function postFormTask () {
    // TODO: POST /cases/{id}/tasks/{id}/create
    const resp = {
      'success': true
    };

    console.log( resp );

    props.setTasks( tasks => [ task, ...tasks ] );

    const html = AfterPostMessage();
    props.agentMessage( html );

    props.close();
  }

  return (
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
          {assigneeList.map( ( assignee ) => {
            return <option value={assignee.id} key={assignee.id}>{assignee.name}</option>;
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
      <div className="form-group col-6">
        <label>Remind in days</label><br />
        <input className="form-control"
          type="number"
          name="followUpDays"
          value={task.followUpDays}
          onChange={setTask} />
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
        <button className="btn-secondary" onClick={props.close}>Cancel</button>
        <LoaderButton className="btn-success" onClick={postFormTask}>submit!</LoaderButton>
      </div>
    </form>
  );
}

export default CreateApprovalTask;