import React from "react"
import { Steps, Icon } from "rsuite"

const statusMap = [
  { state: "Created", status: "process", icon: "edit", color: "info" },
  { state: "Running", status: "process", icon: "user", color: "primary" },
  { state: "Success", status: "process", icon: "check", color: "success" },
  { state: "Failure", status: "error", icon: "exclamation", color: "error" },
]

const findStepIndex = (state) => statusMap.findIndex((s) => s.state === state)
const findStep = (state) => statusMap.find((s) => s.state === state)

const StateBar = ({ state }) => {
  return (
    <Steps
      current={findStepIndex(state)}
      currentStatus={findStep(state).status}
    >
      {statusMap.map((item) => (
        <Steps.Item
          title={item.state}
          key={item.state}
          icon={<Icon icon={item.icon} />}
        />
      ))}
    </Steps>
  )
}

export { StateBar, statusMap }
