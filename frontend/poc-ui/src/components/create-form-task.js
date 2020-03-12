// This is a designtime component, but also used in runtime design.
import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useFormFields } from '../libs/custom-hooks';
import LoaderButton from './loader-button';
import apiWrapper from '../libs/api-wrapper';

function CreateFormTaskForm ( { close, submitFormTask } ) {
  const [ task, setTask ] = useFormFields( {} )
  // TODO: cognito user api
  const assigneeList = [
    { name: 'Baiji', id: 'Baiji' },
    { name: 'Ben', id: 'Ben' },
    { name: 'Jin', id: 'Jin' },
    { name: 'Ronda', id: 'Ronda' },
    { name: 'Tingdong', id: 'Tingdong' }
  ];

  function getTaskDefinition () {
    // const taskDef = {
    //   taskDescription: '',
    //   assignee: assigneeList[ 1 ],
    //   dueDate: new Date(),
    //   followUpDays: 1,
    //   formUrl: ''
    // }

    // TODO: GET /task-definitations/1

    apiWrapper
      .get( '/task-definitions' )
      .then( resp => {
        let taskDefinitions = resp.data
        let taskDefination = taskDefinitions[0]
        let taskDef = resp.data
        setTask(taskDef)
      } )
      .catch( err => {
        console.warn(err)
      })
  }

  useEffect( () => {
    getTaskDefinition()
  }, [] )

  return (
    task &&
    <form onSubmit={e => e.preventDefault()} className="row">
      <div className="form-group col-6">
        <label>Task Name</label>
        <input className="form-control" name="name" value={task.data.name} onChange={setTask} />
      </div>
      <div className="form-group col-6">
        <label>Depend on task</label>
        <input className="form-control" name="dependsOn" value={task.dependsOn} onChange={setTask} />
      </div>
      <div className="form-group col-12">
        <label>Task description</label>
        <textarea className="form-control"
          name="description"
          value={task.data.description}
          placeholder="Please fill in this form..."
          onChange={setTask} />
      </div>
      <hr />
      <div className="form-group col-12">
        <label>Assign to</label><br />
        <select className="form-control"
          name="assignee"
          value={task.data.assignee}
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
          selected={task.data.dueDate}
          onChange={setTask}
        />
      </div>
      <div className="form-group col-6">
        <label>Remind in days</label><br />
        <input className="form-control"
          type="number"
          name="followUpDays"
          value={task.data.followUpDays}
          onChange={setTask} />
      </div>
      <hr />
      <div className="form-group col-12">
        <label className="block">Attach form</label><br />
        <input className="form-control"
          type="url"
          name="formUrl"
          placeholder="form url"
          value={task.data.formUrl}
          onChange={setTask} />
      </div>
      <div className="modal-footer col-12">
        <button className="btn-secondary" onClick={close}>Cancel</button>
        <LoaderButton className="btn-success" onClick={e => submitFormTask(task)}>submit!</LoaderButton>
      </div>
    </form>
  );
}

export default CreateFormTaskForm;