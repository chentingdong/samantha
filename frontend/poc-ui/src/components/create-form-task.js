// This is a designtime component, but also used in runtime design.
import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useFormFields } from '../libs/custom-hooks';
import LoaderButton from './loader-button';
import { formatDate } from '../libs/custom-functions';
import apiWrapper from '../libs/api-wrapper';

function CreateFormTaskForm ( props ) {
  // TODO: cognito user api
  const assigneeList = [
    { name: 'Baiji', id: 'Baiji' },
    { name: 'Ben', id: 'Ben' },
    { name: 'Jin', id: 'Jin' },
    { name: 'Ronda', id: 'Ronda' },
    { name: 'Tingdong', id: 'Tingdong' }
  ];

  let taskDef = {
    caseId: 'e04c6e8b-fc6c-4cb0-886a-d4e36c6cb156',
    data: {
      assignee: 'Tingdong',
      description: 'ask user to intake a form',
      dueDate: '',
      followUpDays: '1',
      formUrl: 'http://example.com/doc',
      name: 'choose form'
    },
    dependsOn: ' ',
    state: 'Active'
  }

  const [ task, setTask ] = useFormFields( taskDef );

  function getTaskDefinition () {
    // TODO: GET /task-definitations/1
/*
    apiWrapper
      .get( '/task-definitions/1' )
      .then( resp => {
        // let taskDef = resp.data
        // setTask(taskDef)
      } )
      .catch( err => {
        console.warn(err)
      }) */
  }

  useEffect( () => {
    getTaskDefinition()
  }, [] )

  function AfterPostMessage () {
    if ( !task ) return '';

    const dueDate = formatDate( task.data.dueDate || new Date() );
    return (
      task &&
      <>
        Your task is added to current case.
        Your message is sent to <b>{task.data.assignee.name}</b>,
        expecting to finish on <b>{dueDate}</b>.
        I will inform him after <b>{task.data.followUpDays}</b> days if not finished.
      </>
    );
  }

  function postFormTask () {
    let path = `/cases/${props.currentCaseId}/tasks`
    apiWrapper
      .post(path, task)
      .then( resp => {
        console.log( resp );
        props.setTasks( tasks => [ task, ...tasks ] );
        const html = AfterPostMessage();
        props.agentMessage( html );
      })
      .catch( err => {
        console.error(err)
      } )
      .then( () => {
        props.close();
      })
  }

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
        <button className="btn-secondary" onClick={props.close}>Cancel</button>
        <LoaderButton className="btn-success" onClick={postFormTask}>submit!</LoaderButton>
      </div>
    </form>
  );
}

export default CreateFormTaskForm;