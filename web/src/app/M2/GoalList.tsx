// GoalList.tsx. appears in responder view, single bell page
import React from "react"
import { Block } from "models/interface"
import { listToTree } from "utils/common"
import { GoalItem } from "./GoalItem"

import styled from "styled-components"
import tw from "tailwind.macro"

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

  const countNotifications = (goal) => {
    const goalNotifications = notifications.filter(
      (notif) => notif.parent_id === goal.id
    )
    return goalNotifications.length
  }

  return (
    <div {...props}>
      <h4 className="border-b">Goals</h4>
      <ol>
        {goalTree.map((root) => {
          return (
            <li key={root.id}>
              <GoalItem
                goal={root}
                countCompletedTasks={countCompletedTasks(root)}
                countNotifications={countNotifications(root)}
              ></GoalItem>
              {root.children.length > 0 && (
                <ul>
                  {root.children.map((child) => (
                    <li key={child.id}>
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
