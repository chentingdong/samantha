import React from "react"
import styled from "styled-components"
import { Button } from "../components/Button"
import tw from "tailwind.macro"

const SpendRequestApprovalRaw: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={className}>
      <form>
        <div>
          <Button>Approve</Button>
          <label>Approve this request</label>
        </div>
        <div>
          <Button>Reject</Button>
          <label>Reject this request and do not need extra action</label>
        </div>
        <div>
          <Button>Reject for Edit</Button>
          <label>
            Rejected, please update the form and send for approval again.
          </label>
        </div>
      </form>
    </div>
  )
}

const SpendRequestApproval = styled(SpendRequestApprovalRaw)``
export default SpendRequestApproval
