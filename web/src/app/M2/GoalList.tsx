// GoalList.tsx. appears in responder view, single bell page
import React from "react"
import { Block } from "models/interface"
import { listTree2Level } from "utils/common"
import { GoalItem } from "./GoalItem"
import { StateIcon } from "components/StateIcon"

import styled from "styled-components"
import tw from "tailwind.macro"

interface GoalListProps {
  goals: Block[]
}

const GoalListRaw: React.FC<GoalListProps> = ({ goals, ...props }) => {
  const goalTree = listTree2Level(goals)

  return (
    <div {...props}>
      <h4 className="border-b">Goals</h4>
      <ol>
        {goalTree.map((root) => {
          return (
            <li key={root.id}>
              <GoalItem goal={root}></GoalItem>
              {root.children.length > 0 && (
                <ul>
                  {root.children.map((child) => (
                    <li key={child.id}>
                      <GoalItem goal={child} key={child.id} {...props} />
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
