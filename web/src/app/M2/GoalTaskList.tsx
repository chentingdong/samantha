import React from "react"
import { Block } from "models/interface"
import { GoalListHeader } from "./GoalListHeader"
import { useLocation, matchPath } from "react-router-dom"

interface GoalTaskListProps {
  goals: Block[]
  tasks: Block[]
}

export const GoalTaskList: React.FC<GoalTaskListProps> = (props) => {
  const location = useLocation()
  const match = matchPath(location.pathname, {
    path: "/bells/:bellId/:goalId?/:context?",
  })
  const bellId = match?.params.bellId
  const goalId = match?.params.goalId || "all"
  const context = match?.params.context || "activities"

  return (
    <div>
      <GoalListHeader link={`/bells/${bellId}/all/${context}`} />
      goal task list...
    </div>
  )
}
