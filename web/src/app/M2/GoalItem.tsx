import * as React from "react"
import { Block } from "models/interface"
import { StateIcon } from "components/StateIcon"
import { CircleIcon, CircleImage, CircleNumber } from "components/Circle"
import styled from "styled-components"
import tw from "tailwind.macro"

interface GoalItemProps {
  goal: Block
}

const GoalItemRaw: React.FC<GoalItemProps> = ({ goal, ...props }) => {
  return (
    <div {...props}>
      <div className="inner">
        <main>
          <div>
            {goal.name}: {goal.className}
          </div>
          <div>Ended at: {goal.ended_at}</div>
          <div>Assigned to: [Tingdong Chen]</div>
        </main>
        <aside className="flex gap-2">
          <CircleIcon icon="attachment" />
          <CircleNumber number={goal?.notifications?.length || 0} />
          <StateIcon className="text-3xl" state={goal.state} />
        </aside>
      </div>
    </div>
  )
}

const GoalItem = styled(GoalItemRaw)`
  ${tw`border-gray-100 border`}
  .inner {
    ${tw`flex justify-between`}
  }
  aside > div {
    ${tw`w-8 h-8`}
  }
`
export { GoalItem }
