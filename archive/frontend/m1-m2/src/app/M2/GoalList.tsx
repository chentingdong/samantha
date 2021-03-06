import { Artifact, Block } from "models/interface"
import { buildRouterUrl, getRouteParams } from "utils/router"
import { findSubGoals, listTreeGenerations } from "utils/bell"
import { useHistory, useLocation } from "react-router-dom"

import { GoalItem } from "./GoalItem"
import { GoalListHeader } from "./GoalListHeader"
// GoalList.tsx. appears in responder view, single bell page
import React from "react"
import { stringHashBucket } from "utils/common"
import styled from "styled-components"
import tw from "tailwind.macro"

interface GoalListProps {
  goals: Block[]
  tasks: Block[]
  notifications: Block[]
  artifacts: Artifact[]
  className?: string
}

const GoalListRaw: React.FC<GoalListProps> = ({
  goals,
  tasks,
  notifications,
  artifacts,
  ...props
}) => {
  const goalTree = listTreeGenerations(goals)
  const location = useLocation()
  const history = useHistory()

  const params = getRouteParams(location.pathname)
  const activeClassName = (goal) => {
    const bellColor =
      `bg-bell-${stringHashBucket(params.bellId, 10)}` || "bg-bell"
    return goal.id === params.goalId ? `active-goal ${bellColor}` : ""
  }
  const headerLink = buildRouterUrl({ ...params, goalId: "all", taskId: "all" })
  // Use div onClick to go to the goal, as <a> inside <a> is not allowed
  const linkToGoal = (goal) => {
    const path = buildRouterUrl({ ...params, goalId: goal.id })
    history.push(path)
  }
  const getGoalTasks = (goal) =>
    tasks?.filter(
      (task) => task.parent.id === goal.id || task.parent.parent?.id === goal.id
    )

  console.log(goals)
  return (
    <div {...props}>
      <GoalListHeader link={headerLink} />
      <ol className="overflow-y-auto">
        {goalTree.map((goal: Block) => {
          return (
            <li
              key={goal.id}
              className={`${activeClassName(goal)} ${goal["className"]}`}
            >
              <div
                onClick={(e) => linkToGoal(goal)}
                className="block no-underline cursor-pointer"
              >
                <GoalItem
                  active={goal.id === params.goalId}
                  goal={goal}
                  subGoals={findSubGoals(goal.id, goals)}
                  tasks={getGoalTasks(goal)}
                  notifications={notifications}
                  artifacts={artifacts}
                />
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

const GoalList = styled(GoalListRaw)`
  & {
    ol {
      li {
        ${tw`my-4 mr-4`}
      }
    }
    ul {
      li {
        ${tw`my-4 ml-4`}
      }
    }
    .active-goal {
      ${tw`bg-gray-200 border-l-8 pr-8`}
      margin-right: -1rem;
    }
    .generation-2 {
      ${tw`ml-4`}
    }
    .generation-3,
    .generation-4,
    .generation-5,
    .generation-6 {
      ${tw`ml-12`}
    }
  }
`

export { GoalList }
