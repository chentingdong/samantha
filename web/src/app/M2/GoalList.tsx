// GoalList.tsx. appears in responder view, single bell page
import React from "react"
import { Block } from "models/interface"
import { stringHashBucket } from "utils/common"
import { listTree2Level } from "utils/bell"
import { GoalItem } from "./GoalItem"
import { GoalListHeader } from "./GoalListHeader"
import styled from "styled-components"
import tw from "tailwind.macro"
import { useLocation, matchPath } from "react-router-dom"

interface GoalListProps {
  goals: Block[]
  tasks: Block[]
  notifications: Block[]
}

const GoalListRaw: React.FC<GoalListProps> = ({
  goals,
  tasks,
  notifications,
  ...props
}) => {
  const blocks = goals.concat(tasks)
  const goalTree = listTree2Level(blocks)

  const location = useLocation()
  const match = matchPath(location.pathname, {
    path: "/bells/:bellId/:goalId?/:context?",
  })

  const bellId = match?.params.bellId
  const goalId = match?.params.goalId || "all"
  const context = match?.params.context || "activities"

  const countCompletedTasks = (goal) => {
    const completed = tasks
      .filter((task) => task.state === "Success")
      .filter(
        (task) =>
          task.parent_id === goal.id ||
          task.parent?.parent_id === goal.id ||
          task.parent?.parent?.parent_id === goal.id
      )
    return completed.length
  }

  const activeClassName = (goal) => {
    const bellColor = `bg-bell-${stringHashBucket(bellId, 10)}` || "bg-bell"
    return goal.id === goalId ? `active ${bellColor}` : ""
  }
  const countNotifications = (goal) => {
    const goalNotifications = notifications.filter(
      (notif) => notif.parent_id === goal.id
    )
    return goalNotifications.length
  }

  return (
    <div {...props}>
      <GoalListHeader link={`/bells/${bellId}/all/${context}`} />
      <ol>
        {goalTree.map((root) => {
          return (
            <li
              key={root.id}
              className={`${activeClassName(root)} ${root.className}`}
            >
              <GoalItem
                goal={root}
                countCompletedTasks={countCompletedTasks(root)}
                countNotifications={countNotifications(root)}
              />
            </li>
          )
        })}
      </ol>
    </div>
  )
}

const GoalList = styled(GoalListRaw)`
  ol {
    li {
      ${tw`my-4 ml-4 mr-0`}
    }
  }
  ul {
    li {
      ${tw`my-4 ml-8 mr-0`}
    }
  }
  .active {
    ${tw`bg-gray-200 border-l-8 pr-4`}
    margin-right: -1rem;
  }
  .generation-2 {
    ${tw`ml-12`}
  }
`

export { GoalList }
