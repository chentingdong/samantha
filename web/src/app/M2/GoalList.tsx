// GoalList.tsx. appears in responder view, single bell page
import React, { useState, useEffect } from "react"
import { Block } from "models/interface"
import { listTree2Level } from "utils/common"
import { GoalItem } from "./GoalItem"
import styled from "styled-components"
import tw from "tailwind.macro"

interface GoalListProps {
  goals: Block[]
}

const GoalListRaw: React.FC<GoalListProps> = ({ goals, ...props }) => {
  const goalTree = listTree2Level(goals)

  return (
    <ol {...props}>
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
  )
}

const GoalList = styled(GoalListRaw)`
  ${tw`m-4`}
  ol li {
    ${tw`mx-4 my-4 list-decimal`}
  }
  ul li {
    ${tw`mx-4 my-8 ml-8 list-disc`}
  }
`

export { GoalList }
