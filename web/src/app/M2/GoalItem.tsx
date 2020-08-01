import * as React from "react"
import { Block } from "models/interface"
import styled from "styled-components"
import tw from "tailwind.macro"

interface GoalItemProps {
  goal: Block
}

const GoalItemRaw: React.FC<GoalItemProps> = ({ goal, ...props }) => {
  return (
    <div {...props}>
      <div>
        {goal.name}: {goal.className}
      </div>
      <div>Ended at: {goal.ended_at}</div>
      <div>Assigned to: [Tingdong Chen]</div>
    </div>
  )
}

const GoalItem = styled(GoalItemRaw)``
export { GoalItem }
