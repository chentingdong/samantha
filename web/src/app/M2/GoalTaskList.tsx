import React from "react"
import { Block } from "models/interface"
import { GoalListHeader } from "./GoalListHeader"
import { useLocation } from "react-router-dom"
import { getBellLocationParams } from "utils/bell"

interface GoalTaskListProps {
  goals: Block[]
  tasks: Block[]
}

export const GoalTaskList: React.FC<GoalTaskListProps> = (props) => {
  const location = useLocation()
  const params = getBellLocationParams(location)
  return (
    <div>
      <GoalListHeader link={`/bells/${params.bellId}/all/${params.context}`} />
      goal task list...
    </div>
  )
}
