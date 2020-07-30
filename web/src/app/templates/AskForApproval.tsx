import * as React from "react"
import { ResponseFieldProps } from "app/templates/ResponseFieldProps"
import { Button } from "components/Button"

interface AskForApprovalProps {
  approved?: boolean
}

const AskForApprovalDisplay: React.FC<AskForApprovalProps> = ({ approved }) => {
  return <div>Your request was {approved ? "approved" : "rejected"}</div>
}

const AskForApprovalEdit: React.FC<AskForApprovalProps> = ({ approved }) => {
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

export const AskForApproval: React.FC<ResponseFieldProps> = ({
  field,
  view,
  ...props
}) => {
  return (
    <>
      {view === "display" && (
        <AskForApprovalDisplay approved={field?.response} />
      )}
      {view === "edit" && <AskForApprovalEdit approved={field?.response} />}
    </>
  )
}
