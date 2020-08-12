import React from "react"
import {TaskItemProps} from "app/templates/TaskItemProps"
import {Button} from "components/Button"
import {TemplateFieldSelect} from "models/interface"

export interface SelectProps {
  field: TemplateFieldSelect
  view?: string
  onSubmit: (field: TemplateFieldSelect) => void
}

const SingleSelectDisplay: React.FC<{value: string}> = ({value}) => {
  return <div>{value}</div>
}

const SingleSelectEdit: React.FC<SelectProps> = ({field, onSubmit}) => {
  const submit = (selected) => {
    onSubmit({...field, response: selected})
  }
  return (
    <div>
      {field?.select_options.map((option) => (
        <Button
          key={option}
          color="secondary"
          className="px-4 py-1 text-sm fill"
          onClick={e => submit(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  )
}

const SingleSelect: React.FC<TaskItemProps> = ({field, view, onSubmit, ...props}) => {
  return (
    <>
      {view === "display" && (
        <SingleSelectDisplay value={field?.response} {...props} />
      )}
      {view === "edit" && (
        <SingleSelectEdit field={field} onSubmit={onSubmit} />
      )}
    </>
  )
}

export {SingleSelect}
