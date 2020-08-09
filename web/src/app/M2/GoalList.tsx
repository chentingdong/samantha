// GoalList.tsx. appears in responder view, single bell page
import React from "react"
import { Block } from "models/interface"
import { stringHashBucket } from "utils/common"
import {
  listTreeGenerations,
  countCompletedTasks,
  countNotifications,
} from "utils/bell"
import { getRouteParams, buildRouterUrl } from "utils/router"
import { GoalItem } from "./GoalItem"
import { GoalListHeader } from "./GoalListHeader"
import styled from "styled-components"
import tw from "tailwind.macro"
import { useLocation, Link } from "react-router-dom"

interface GoalListProps {
  goals: Block[]
  tasks: Block[]
  notifications: Block[]
  className?: string
}

const GoalListRaw: React.FC<GoalListProps> = ({
  goals,
  tasks,
  notifications,
  ...props
}) => {
  const goalTree = listTreeGenerations(goals)
  const location = useLocation()
  const params = getRouteParams(location)
  const activeClassName = (goal) => {
    const bellColor =
      `bg-bell-${stringHashBucket(params.bellId, 10)}` || "bg-bell"
    return goal.id === params.goalId ? `active ${bellColor}` : ""
  }
  const headerLink = buildRouterUrl({ ...params, goalId: "all", taskId: "all" })
  return (
    <div {...props}>
      <GoalListHeader link={headerLink} />
      <ol>
        {goalTree.map((goal) => {
          return (
            <li
              key={goal.id}
              className={`${activeClassName(goal)} ${goal.className}`}
            >
              <Link
                to={buildRouterUrl({ ...params, goalId: goal.id })}
                className="block no-underline cursor-pointer"
              >
                <GoalItem
                  active={goal.id === params.goalId}
                  goal={goal}
                  countCompletedTasks={countCompletedTasks(goal, tasks)}
                  countNotifications={countNotifications(goal, notifications)}
                />
              </Link>
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
    .active {
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
