// GoalList.tsx. appears in responder view, single bell page
import React from "react"
import { Block } from "models/interface"
import { listToTree } from "utils/common"
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
  const goalTree = listToTree(blocks)
  const location = useLocation()
  const match = matchPath(location.pathname, {
    path: "/bells/:bellId/:goalId/:context",
  })
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
    return goal.id === match?.params?.goalId ? "active" : ""
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
        <Link to={`/bells/${match.params.bellId}/all/${match.params.context}`}>
          <Button className="p-2 fill" color="primary">
            All Goals
          </Button>
        </Link>
      </div>
      <ol>
        {goalTree.map((root) => {
          return (
            <li key={root.id} className={activeClassName(root)}>
              <GoalItem
                goal={root}
                countCompletedTasks={countCompletedTasks(root)}
                countNotifications={countNotifications(root)}
              ></GoalItem>
              {root.children.length > 0 && (
                <ul>
                  {root.children.map((child) => (
                    <li key={child.id} className={activeClassName(child)}>
                      <GoalItem
                        key={child.id}
                        goal={child}
                        countCompletedTasks={countCompletedTasks(child)}
                        countNotifications={countNotifications(child)}
                        {...props}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

const GoalList = styled(GoalListRaw)`
  ol li {
    ${tw`my-4 ml-4 mr-0 list-decimal`}
  }
  ul li {
    ${tw`my-4 ml-8 mr-0 list-disc`}
  }
`

export { GoalList }
