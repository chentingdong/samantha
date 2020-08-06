// GoalList.tsx. appears in responder view, single bell page
import React from "react"
import { Block } from "models/interface"
import { stringHashBucket } from "utils/common"
import {
  listTree2Level,
  getBellLocationParams,
  countCompletedTasks,
  countNotifications,
} from "utils/bell"
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
  const blocks = goals.concat(tasks)
  const goalTree = listTree2Level(blocks)
  const location = useLocation()
  const params = getBellLocationParams(location)
  const activeClassName = (goal) => {
    const bellColor =
      `bg-bell-${stringHashBucket(params.bellId, 10)}` || "bg-bell"
    return goal.id === params.goalId ? `active ${bellColor}` : ""
  }

  return (
    <div {...props}>
      <GoalListHeader link={`/bells/${params.bellId}/all/${params.context}`} />
      <ol>
        {goalTree.map((root) => {
          return (
            <li
              key={root.id}
              className={`${activeClassName(root)} ${root.className}`}
            >
              <Link
                to={`/bells/${params.bellId}/${root.id}/${params.context}`}
                className="block no-underline cursor-pointer"
              >
                <GoalItem
                  active={root.id === params.goalId}
                  goal={root}
                  countCompletedTasks={countCompletedTasks(root, tasks)}
                  countNotifications={countNotifications(root, notifications)}
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
    ${tw`ml-12`}
  }
`

export { GoalList }
