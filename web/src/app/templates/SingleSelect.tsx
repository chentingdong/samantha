import * as React from "react"
import { TaskItemProps } from "app/templates/TaskItemProps"
import { Button } from "components/Button"

interface SingleSelectProps {
  approved?: boolean
}

const SingleSelectDisplay: React.FC<SingleSelectProps> = ({ approved }) => {
  return <div>{approved}</div>
}

const SingleSelectEdit: React.FC<SingleSelectProps> = ({ approved }) => {
  const updateField = (approve) => {
    console.log("TODO: mutation to update task, approve: " + approve)
  }
  return (
    <div>
      <Button
        color="secondary"
        className="text-sm fill"
        onClick={(e) => updateField(true)}
      >
        Yes
      </Button>
      <Button
        color="secondary"
        className="mr-0 text-sm"
        onClick={(e) => updateField(false)}
      >
        No
      </Button>
    </div>
  )
}

export const SingleSelect: React.FC<TaskItemProps> = ({
  field,
  view,
  ...props
}) => {
  return (
    <>
      {view === "display" && <SingleSelectDisplay approved={field?.response} />}
      {view === "edit" && <SingleSelectEdit approved={field?.response} />}
    </>
  )
}
