// This is a designtime component, but also used in runtime design.
import React from 'react';
import DatePicker from 'react-datepicker'
import { useFormFields } from '../libs/custom-hooks'
import LoaderButton from './loader-button'

function CreateHumanTaskForm (props) {
  // TODO: cognito user api
  const assigneeList = [
    { name: 'Baiji', id: 'Baiji' },
    { name: 'Ben', id: 'Ben' },
    { name: 'Jin', id: 'Jin' },
    { name: 'Ronda', id: 'Ronda' },
    { name: 'Tingdong', id: 'Tingdong' }
  ]

  // TODO: default human task schema should come from an api.
  const [ humanTaskForm, setHumanTaskForm ] = useFormFields({
    taskDescription: '',
    assignee: assigneeList[ 0 ],
    dueDate: new Date(),
    followUpDays: 1,
    formUrl: 'test'
  })

  function createHumanTask () {
    const assignee = humanTaskForm.assignee.name
    const dueDate = JSON.stringify(humanTaskForm.dueDate)
    const followUpDays = humanTaskForm.followUpDays

    const html = (
      <>
        Your message is sent to <b>{assignee}</b>,
        should finish on <b>{dueDate}</b>,
        we will inform him after <b>{followUpDays}</b> days if not finished.
      </>
    )
    props.agentMessage(html)
    props.close()
  }

  return (
    <form onSubmit={e => e.preventDefault()} className="row">
      <div className="form-group col-12">
        <label>Task description</label>
        <textarea className="form-control"
          name="taskDescription"
          value={humanTaskForm.taskDescription}
          placeholder="Please fill in this form..."
          onChange={setHumanTaskForm} />
      </div>
      <hr />
      <div className="form-group col-12">
        <label>Assign to</label><br />
        <select className="form-control"
          name="assignee"
          value={humanTaskForm.assignee}
          onChange={setHumanTaskForm} >
          {assigneeList.map((assignee) => {
            return <option value={assignee.id} key={assignee.id}>{assignee.name}</option>
          })}
        </select>
      </div>
      <div className="form-group col-6">
        <label>Due date</label><br />
        <DatePicker className="form-control"
          name="dueDate"
          selected={humanTaskForm.dueDate}
          onChange={setHumanTaskForm}
        />
      </div>
      <div className="form-group col-6">
        <label>Remind in days</label><br />
        <input className="form-control"
          type="number"
          name="followUpDays"
          value={humanTaskForm.followUpDays}
          onChange={setHumanTaskForm} />
      </div>
      <hr />
      <div className="form-group col-12">
        <label>Attach form (optional)</label>
        <input className="form-control"
          type="url"
          name="formUrl"
          placeholder="http://form_url "
          value={humanTaskForm.formUrl}
          onChange={setHumanTaskForm} />
      </div>
      <div className="modal-footer col-12">
        <button className="btn-secondary" onClick={props.close}>Cancel</button>
        <LoaderButton className="btn-success" onClick={createHumanTask}>Start task now!</LoaderButton>
      </div>
    </form>
  )
}

export default CreateHumanTaskForm