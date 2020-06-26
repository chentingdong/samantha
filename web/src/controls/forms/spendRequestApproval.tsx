import React from "react"
import styled from "styled-components"
import { Button } from "../../components/Button"
import { useForm } from "react-hook-form"

const SpendRequestApprovalRaw: React.FC<{
  onSubmit: (form) => void
  onSuccess: () => void
  onFailure: () => void
  form: object
}> = ({ onSubmit, onSuccess, onFailure, form }) => {
  const { register, getValues } = useForm({
    defaultValues: form,
  })
  const submit = (e, value) => {
    e.preventDefault()
    onSubmit({ value: value })
  }

  return (
    <form>
      <div>
        <Button
          name="approve"
          onClick={(e) => {
            submit(e, "approval")
            onSuccess()
          }}
        >
          Approve
        </Button>
        <label>Approve this request</label>
      </div>
      <div>
        <Button
          name="reject"
          onClick={(e) => {
            submit(e, "reject")
            onFailure()
          }}
        >
          Reject
        </Button>
        <label>Reject this request and do not need extra action</label>
      </div>
      <div>
        <Button name="rejectExit" onClick={(e) => submit(e, "rejectExit")}>
          Reject for Edit
        </Button>
        <label>
          Rejected, please update the form and send for approval again.
        </label>
      </div>
    </form>
  )
}

const SpendRequestApproval = styled(SpendRequestApprovalRaw)``
export default SpendRequestApproval
