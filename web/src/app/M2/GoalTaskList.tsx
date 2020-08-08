import React from "react"
import { Block } from "models/interface"
import { GoalListHeader } from "./GoalListHeader"
import { useLocation } from "react-router-dom"
import { countCompletedTasks, getRouteParams, buildRouterUrl } from "utils/bell"
import { stringHashBucket } from "utils/common"
import { GoalItem } from "./GoalItem"
import styled from "styled-components"
import tw from "tailwind.macro"
import { TaskList } from "./TaskList"

interface GoalTaskListProps {
  goals: Block[]
  tasks: Block[]
}

const GoalTaskListRaw: React.FC<GoalTaskListProps> = ({
  goals,
  tasks,
  ...props
}) => {
  const location = useLocation()
  const params = getRouteParams(location)

  const bellColor =
    `bg-bell-${stringHashBucket(params.bellId, 10)}` || "bg-bell"
  const goal = goals.filter((goal) => goal.id === params.goalId)[0]

  const goalTasks = tasks.filter(
    (task) =>
      task.parent.id === params.goalId ||
      task.parent?.parent?.id === params.goalId
  )

  return (
    <div {...props}>
      <GoalListHeader link={buildRouterUrl({ ...params, goalId: "all" })} />
      <div className={`${bellColor} active`}>
        <GoalItem
          goal={goal}
          active={true}
          countCompletedTasks={countCompletedTasks(goal, tasks)}
          countNotifications={null}
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
