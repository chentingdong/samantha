import * as React from "react"
import { Block } from "models/interface"
import { ActivityStateIcon } from "components/StateIcon"
import { CircleIcon, CircleNumber } from "components/Circle"
import styled from "styled-components"
import tw from "tailwind.macro"
import { Icon } from "rsuite"
import { displayParticipants } from "utils/user"
import { displayDate } from "utils/common"
import { useLocation, Link } from "react-router-dom"
import { getRouteParams, buildRouterUrl } from "utils/router"
import { countGoalTasks, countGoalNotifications } from "utils/bell"
import { TODO } from "components/Todo"

interface GoalItemProps {
  goal: Block
  tasks: Block[]
  notifications: Block[]
  active: boolean
}

const GoalItemRaw: React.FC<GoalItemProps> = ({
  goal,
  tasks,
  notifications,
  active = false,
  ...props
}) => {
  const location = useLocation()
  const params = getRouteParams(location)

  const goalAssignees = goal?.user_participations.filter(
    (participant) => participant.role === "goal_asignee"
  )

  const runningTasksCount = countGoalTasks(goal, tasks, ["Running"])
  const completedTasksCount = countGoalTasks(goal, tasks, [
    "Success",
    "Failure",
  ])
  const notificationsCount = countGoalNotifications(goal, notifications)
  return (
    <div {...props}>
      <div className="flex justify-between">
        <main>
          <div>{goal?.name}</div>
          {goal?.state === "Success" && (
            <div>Ended at: {displayDate(goal.ended_at)}</div>
          )}
          {goal?.state === "Running" && (
            <div className="text-sm">
              Started at: {displayDate(goal.started_at)}
            </div>
          )}
          {goal?.state === "Created" && (
            <div className="text-sm">
              Created at: {displayDate(goal.created_at)}
            </div>
          )}
          {goal?.user_participations.length > 0 && (
            <div className="text-sm">
              Assigned to: {displayParticipants(goalAssignees)}
            </div>
          )}
        </main>
        <aside>
          <div className="flex icons gap-2">
            {runningTasksCount > 0 && (
              <CircleNumber
                number={runningTasksCount}
                className="bg-green-500"
              />
            )}
            <CircleIcon icon="attachment" />
            {notificationsCount > 0 && (
              <Link
                className="no-underline"
                to={buildRouterUrl({ ...params, context: "activities" })}
                onClick={(e) => e.stopPropagation()}
              >
                <CircleNumber number={notificationsCount} />
              </Link>
            )}
            <ActivityStateIcon className="icon" state={goal?.state} />
          </div>
        </aside>
      </div>
      <TODO show={false} className="w-full">
        confirm with team of adding a context field to block
      </TODO>
      <footer className="flex justify-between w-full mt-4 text-sm text-gray-500">
        <div>{completedTasksCount} Tasks Completed</div>
        {!active && (
          <div className="flex-none">
            Goal taskId <Icon icon="hand-o-right" />
          </div>
        )}
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
