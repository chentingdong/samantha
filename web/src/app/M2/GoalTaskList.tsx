import { buildRouterUrl, getRouteParams } from "utils/router"

import { Block } from "models/interface"
import { GoalItem } from "./GoalItem"
import { GoalListHeader } from "./GoalListHeader"
import React from "react"
import { TaskList } from "./TaskList"
import { findSubGoals } from "utils/bell"
import { stringHashBucket } from "utils/common"
import styled from "styled-components"
import tw from "tailwind.macro"
import { useLocation } from "react-router-dom"

interface GoalTaskListProps {
  goals: Block[]
  tasks: Block[]
  notifications: Block[]
  artifacts: Artifact[]
}

const GoalTaskListRaw: React.FC<GoalTaskListProps> = ({
  goals,
  tasks,
  notifications,
  artifacts,
  ...props
}) => {
  const location = useLocation()
  const params = getRouteParams(location.pathname)

  const bellColor =
    `bg-bell-${stringHashBucket(params.bellId, 10)}` || "bg-bell"
  const goal = goals?.filter((goal) => goal.id === params.goalId)[0]
  const goalTasks = tasks?.filter(
    (task) =>
      task.parent.id === params.goalId ||
      task.parent.parent?.id === params.goalId
  )

  const subGoals = findSubGoals(goal?.id, goals)
  return (
    <div {...props}>
      <GoalListHeader
        link={buildRouterUrl({ ...params, goalId: "all", taskId: "all" })}
      />
      <div className={`${bellColor} active`}>
        <GoalItem
          goal={goal}
          subGoals={subGoals}
          tasks={goalTasks}
          notifications={notifications}
          artifacts={artifacts}
          active={true}
        />
      </div>
      <TaskList className="mr-4" tasks={goalTasks} />
    </div>
  )
}

const GoalTaskList = styled(GoalTaskListRaw)`
  .active {
    ${tw`bg-gray-200 border-l-8 pr-4`}
    margin-right: -1rem;
  }
`
export { GoalTaskList }
