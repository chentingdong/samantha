import React from "react"
import { TaskItemProps } from "app/templates/TaskItemProps"
import { Button } from "components/Button"

interface SingleSelectProps {
  value: string
  options?: string[]
}

const SingleSelectDisplay: React.FC<SingleSelectProps> = ({ value }) => {
  return <div>{value}</div>
}

const SingleSelectEdit: React.FC<SingleSelectProps> = ({ value, options }) => {
  const updateField = (value) => {
    console.log("TODO: mutation to update task, choosed value: " + value)
  }
  return (
    <div>
      {options.map((option) => (
        <Button
          key={option}
          color="secondary"
          className="px-4 py-1 text-sm fill"
          onClick={(e) => updateField(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  )
}

const SingleSelect: React.FC<TaskItemProps> = ({ field, view, ...props }) => {
  return (
    <>
      {view === "display" && (
        <SingleSelectDisplay value={field?.response} {...props} />
      )}
      {view === "edit" && (
        <SingleSelectEdit
          value={field?.response}
          options={field.select_options}
          {...props}
        />
      )}
    </>
  )
}

export { SingleSelectDisplay, SingleSelectEdit, SingleSelect }
