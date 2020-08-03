// GoalList.tsx. appears in responder view, single bell page
import React from "react"
import { Block } from "models/interface"
import { listTree2Level, stringHashBucket } from "utils/common"
import { GoalItem } from "./GoalItem"

import styled from "styled-components"
import tw from "tailwind.macro"
import { useLocation, matchPath, Link } from "react-router-dom"
import { Button } from "components/Button"

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

  const match =
    matchPath(location.pathname, {
      path: "/bells/:bellId/:goalId/:context",
    }) || matchPath(location.pathname, { path: "/bells/:bellId" })

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
    return goal.id === match?.params?.goalId ? `active ${bellColor}` : ""
  }
  const countNotifications = (goal) => {
    const goalNotifications = notifications.filter(
      (notif) => notif.parent_id === goal.id
    )
    return goalNotifications.length
  }

  return (
    <div {...props}>
      <div className="flex justify-between w-full border-b">
        <h4 className="">Goals</h4>
        <Link to={`/bells/${bellId}/all/${context}`}>
          <Button className="p-2 fill" color="secondary">
            View All Goals
          </Button>
        </Link>
      </div>
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
              ></GoalItem>
              {/* {root.children?.length > 0 && (
                <ul>
                  {root.children.map((child) => (
                    <li key={child.id} className={activeClassName(child)}>
                      <GoalItem
                        goal={child}
                        countCompletedTasks={countCompletedTasks(child)}
                        countNotifications={countNotifications(child)}
                        {...props}
                      />
                    </li>
                  ))}
                </ul>
              )} */}
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
