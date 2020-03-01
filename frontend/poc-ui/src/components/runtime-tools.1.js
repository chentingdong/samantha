import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import { useFormFields } from '../libs/custom-hooks'

// TODO: split this component to task forms components
function RuntimeTools (props) {
  // const [ showHumanTaskModal, setShowHumanTaskModal ] = useState(true)

  // TODO: user manager endpoints with Cognito
  const assigneeList = [
    { name: 'Baiji', id: 'Baiji' },
    { name: 'Ben', id: 'Ben' },
    { name: 'Jin', id: 'Jin' },
    { name: 'Ronda', id: 'Ronda' },
    { name: 'Tingdong', id: 'Tingdong' }
  ]

  const formList = [{
    id: 'form-1',
    name: 'form 1'
  }]

  const [ humanTaskForm, setHumanTaskForm ] = useFormFields({
    taskDescription: 'Please fill in this form and submit for approval:',
    assignee: assigneeList[ 0 ],
    dueDate: new Date(),
    followupDays: 1
  })

  function newHumanTask () {
    console.log('popup new human task layer')
    // setShowHumanTaskModal(true)
  }

  function createHumanTask (e) {
    e.preventDefault();
    const data = JSON.stringify(humanTaskForm)
    console.log(`create human task: ${data}`)

    // setShowHumanTaskModal(false)
  }

  function cancelHumanTask () {
    console.log('cancel human task creation')
    // setShowHumanTaskModal(false)
  }

  function HumanTaskModal () {
    return (
      <div id="humanTaskModal" className="" tabIndex="-1" role="dialog">
        <div className="modal-header">
          <div className="modal-title">Add human task</div>
        </div>
        <form id="new-human-task" onSubmit={createHumanTask}>
          <div className="modal-body row">
            <div className="form-group col-12">
              <label>Task description</label>
              <textarea className="form-control" value={humanTaskForm.taskDescription} onChange={e => setHumanTaskForm(e)} />
            </div>
            <hr />
            <div className="form-group col-12">
              <label>Assign to</label><br />
              <select className="form-control" name="assignee" value={humanTaskForm.assignee} onChange={e => setHumanTaskForm(e)}>
                {assigneeList.map((assignee) => {
                  return <option value={assignee.id} key={assignee.id}>{assignee.name}</option>
                })}
              </select>
            </div>
            <div className="form-group col-6">
              <label>Due date</label><br />
              <DatePicker className="form-control" name="dueDate" selected={humanTaskForm.dueDate} />
            </div>
            <div className="form-group col-6">
              <label>Remind in days</label><br />
              <input className="form-control" type="number" name="followupDays" value={humanTaskForm.followupDays}
                onChange={e => setHumanTaskForm(e)}/>
            </div>
            <hr />
            <div className="form-group col-12">
              <label>Attach form (optional)</label><br/>
              <select className="form-control" name="attachedForms" select={humanTaskForm.attachedForms}>
                <option>form_1</option>
                <option>form_2</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" type="submit" onClick={cancelHumanTask}>
              Cancel
            </button>
            <button className="btn btn-primary" type="submit" onClick={createHumanTask}>
              Add and track task
            </button>
          </div>
        </form>
      </div>
    )
  }

  function newProcessTask () {
    console.log('popup new process task layer')
  }

  function newCaseTask () {
    console.log('popup new case task layer')
  }

  return (
    <div className="runtime-tools row">
      <div className="btn-group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-light"
          data-toggle="modal"
          data-target="#humanTaskModal">human task</button>
        <button
          type="button"
          className="btn btn-light"
          onClick={newProcessTask}
          disabled>process task</button>
        <button
          type="button"
          className="btn btn-light"
          onClick={newCaseTask}
          disabled>case task</button>
      </div>
      <HumanTaskModal />
    </div >
  );
};

export default RuntimeTools;