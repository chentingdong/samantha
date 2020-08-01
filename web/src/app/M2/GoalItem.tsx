import * as React from "react"
import { Block } from "models/interface"
import { StateIcon } from "components/StateIcon"
import { CircleIcon, CircleImage, CircleNumber } from "components/Circle"
import styled from "styled-components"
import tw from "tailwind.macro"
import { Icon } from "rsuite"

interface GoalItemProps {
  goal: Block
}

const GoalItemRaw: React.FC<GoalItemProps> = ({ goal, ...props }) => {
  return (
    <div {...props}>
      <div className="flex justify-between">
        <main>
          <div>
            {goal.name}: {goal.className}
          </div>
          <div>Ended at: {goal.ended_at}</div>
          <div>Assigned to: [Tingdong Chen]</div>
          <div className="mt-4 text-sm text-gray-500">{2} Tasks Completed</div>
        </main>
        <aside>
          <div className="flex icons gap-2">
            <CircleIcon icon="attachment" />
            <CircleNumber number={goal?.notifications?.length || 0} />
            <StateIcon className="icon" state={goal.state} />
          </div>
          <div className="flex justify-end mt-2">
            <Icon className="p-1 text-lg" icon="angle-right" />
            <div className="ml-2 text-sm underline cursor-pointer">
              Goal Details <br />
              Tasks
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

const GoalItem = styled(GoalItemRaw)`
  ${tw`border-gray-100 border p-4`}
  &:hover {
    ${tw`bg-gray-100`}
  }
  aside {
    .icons {
      & > * {
        ${tw`w-8 h-8`}
      }
      & > .icon {
        font-size: 38px;
        margin-top: -2px;
      }
    }
  }
`
export { GoalItem }
