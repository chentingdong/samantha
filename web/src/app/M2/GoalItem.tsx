import React from "react"
import {Block, Artifact} from "models/interface"
import {ActivityStateIcon} from "components/StateIcon"
import {CircleIcon, CircleNumber} from "components/Circle"
import styled from "styled-components"
import tw from "tailwind.macro"
import {Icon} from "rsuite"
import {displayParticipants} from "utils/user"
import {displayDate} from "utils/common"
import {useLocation, useHistory} from "react-router-dom"
import {getRouteParams, buildRouterUrl} from "utils/router"
import {
  filterGoalTasks,
  filterGoalNotifications,
  filterGoalArtifacts,
} from "utils/bell"

interface GoalItemProps {
  goal: Block
  subGoals: Block[]
  tasks: Block[]
  notifications: Block[]
  artifacts: Artifact[]
  active: boolean
}

const GoalItemRaw: React.FC<GoalItemProps> = ({
  goal,
  subGoals,
  tasks,
  notifications,
  artifacts,
  active = false,
  ...props
}) => {
  const location = useLocation()
  const history = useHistory()
  const params = getRouteParams(location)

  const goalAssignees = goal?.user_participations?.filter(
    (participant) => participant.role === "goal_asignee"
  )

  const runningTasks = filterGoalTasks(goal, tasks, ["Running"])
  const completedTasks = filterGoalTasks(goal, tasks, ["Success", "Failure"])

  const linkToContext = (e, context) => {
    // click context circles should not propagate click to goal
    e.stopPropagation()
    history.push(
      buildRouterUrl({
        ...params,
        context: context,
        goalId: goal.id,
      })
    )
  }

  const goalArtifacts = filterGoalArtifacts(params.bellId, subGoals, artifacts)
  const goalNotifications = filterGoalNotifications(subGoals, notifications)
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
            {runningTasks?.length > 0 && (
              <div
                className="no-underline"
                onClick={(e) => linkToContext(e, "activities")}
              >
                <CircleNumber
                  number={runningTasks.length}
                  className="bg-green-500"
                />
              </div>
            )}
            {goalArtifacts?.length > 0 && (
              <div
                className="no-underline"
                onClick={(e) => linkToContext(e, "artifacts")}
              >
                <CircleIcon icon="attachment" />
              </div>
            )}
            {goalNotifications?.length > 0 && (
              <div
                className="no-underline"
                onClick={(e) => linkToContext(e, "activities")}
              >
                <CircleNumber number={goalNotifications.length} />
              </div>
            )}
            <ActivityStateIcon className="icon" state={goal?.state} />
          </div>
        </aside>
      </div>
      <footer className="flex justify-between w-full mt-4 text-sm text-gray-500">
        <div>{completedTasks?.length} Tasks Completed</div>
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
export {GoalItem}
