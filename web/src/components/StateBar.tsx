import React from "react"
import { Steps } from "rsuite"

const stateMap = {
  DRAFT: 0,
  PENDING: 1,
  ACTIVE: 2,
  COMPLETE: 3,
}

const StateBar = ({ state }) => {
  return (
    <Steps current={stateMap[state]}>
      <Steps.Item title="Draft" />
      <Steps.Item title="Pending" />
      <Steps.Item title="Active" />
      <Steps.Item title="Complete" />
    </Steps>
  )
}

export { StateBar }
