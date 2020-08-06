import * as React from "react"
import { Block } from "models/interface"
import { ActivityStateIcon } from "components/StateIcon"
import { CircleIcon, CircleNumber } from "components/Circle"
import styled from "styled-components"
import tw from "tailwind.macro"
import { Icon } from "rsuite"
import { displayParticipants } from "utils/user"
import { displayDate } from "utils/common"
import { useLocation } from "react-router-dom"
import { getBellLocationParams } from "utils/bell"

interface GoalItemProps {
  goal: Block
  countCompletedTasks: number
  countNotifications: number
}

const GoalItemRaw: React.FC<GoalItemProps> = ({
  goal,
  countCompletedTasks,
  countNotifications,
  ...props
}) => {
  const location = useLocation()
  const params = getBellLocationParams(location)

  const goalAssignees = goal.user_participations.filter(
    (participant) => participant.role === "goal_asignee"
  )
  return (
    <div {...props}>
      <div className="flex justify-between">
        <main>
          <div>{goal.name}</div>
          {goal.state === "Success" && (
            <div>Ended at: {displayDate(goal.ended_at)}</div>
          )}
          {goal.state === "Running" && (
            <div className="text-sm">
              Updated at: {displayDate(goal.updated_at)}
            </div>
          )}
          {goal.state === "Created" && (
            <div className="text-sm">
              Created at: {displayDate(goal.created_at)}
            </div>
          )}
          {goal.user_participations.length > 0 && (
            <div className="text-sm">
              Assigned to: {displayParticipants(goalAssignees)}
            </div>
          )}
        </main>
        <aside>
          <div className="flex icons gap-2">
            <CircleIcon icon="attachment" />
            <CircleNumber number={countNotifications} />
            <ActivityStateIcon className="icon" state={goal.state} />
          </div>
        </aside>
      </div>
      <footer className="flex justify-between w-full mt-4 text-sm text-gray-500">
        <div>{countCompletedTasks} Tasks Completed</div>
        <div className="flex-none">
          Goal Details <Icon icon="hand-o-right" />
        </div>
      </footer>
    </div>
  )
}

const GoalItem = styled(GoalItemRaw)`
  ${tw`border-gray-200 border p-4`}

  &:hover {
    ${tw`bg-gray-200`}
  }
  aside {
    .icons {
      & > * {
        ${tw`w-8 h-8`}
      }
      & > .icon {
        font-size: 38px;
        line-height: 31px;
      }
    }
  }
`
export { GoalItem }
