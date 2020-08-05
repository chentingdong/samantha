import * as React from "react"
import { Block } from "models/interface"
import { ActivityStateIcon } from "components/StateIcon"
import { CircleIcon, CircleNumber } from "components/Circle"
import styled from "styled-components"
import tw from "tailwind.macro"
import { Icon } from "rsuite"
import { displayParticipants } from "utils/user"
import { displayDate } from "utils/common"
import { Link, useLocation } from "react-router-dom"
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
            <div>Updated at: {displayDate(goal.updated_at)}</div>
          )}
          {goal.state === "Created" && (
            <div>Created at: {displayDate(goal.created_at)}</div>
          )}
          {goal.user_participations.length > 0 && (
            <div>Assigned to: {displayParticipants(goalAssignees)}</div>
          )}
          <div className="mt-4 text-sm text-gray-500">
            {countCompletedTasks} Tasks Completed
          </div>
        </main>
        <aside>
          <div className="flex icons gap-2">
            <CircleIcon icon="attachment" />
            <CircleNumber number={countNotifications} />
            <ActivityStateIcon className="icon" state={goal.state} />
          </div>
          <div className="flex justify-end mt-2">
            <Icon className="p-1 text-lg" icon="angle-right" />
            <Link
              to={`/bells/${params.bellId}/${goal.id}/${params.context}`}
              className="ml-2 text-sm underline cursor-pointer"
            >
              Goal Details <br />
              Tasks
            </Link>
          </div>
        </aside>
      </div>
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
