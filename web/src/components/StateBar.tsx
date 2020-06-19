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
      <Steps.Item title="Created" />
      <Steps.Item title="Ready" />
      <Steps.Item title="Running" />
      <Steps.Item title="Success" />
    </Steps>
  )
}

export { StateBar }
