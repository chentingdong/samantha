//GoalNavigator.tsx
// Bell Home / Goal Navigator
// A goal is a list of tasks in a bell, which can have multiple goals.

import React, { useEffect, useState } from "react"
import { UI_STATE } from "../../operations/queries/uiState"
import { useQuery, useLazyQuery } from "@apollo/client"
import { BELLS_BY_PK } from "operations/queries/bellByPk"
import { Icon } from "rsuite"
import { TODO } from "components/TODO"
import { initialBell, testingBell } from "../../../data/bell"
import { Button } from "components/Button"
import { setUiState } from "../../operations/mutations/setUiState"
import { Goal } from "../M2/Goal"

interface GoalNavigatorProps {
  className?: string
}
export const GoalNavigator: React.FC<GoalNavigatorProps> = ({
  className,
  ...props
}) => {
  const {
    data: { uiState },
  } = useQuery(UI_STATE)

  const [getData, { data }] = useLazyQuery(BELLS_BY_PK)
  const [bell, setBell] = useState(initialBell)

  useEffect(() => {
    if (uiState.currentBellDefId) {
      getData({ variables: { id: uiState.currentBellDefId } })
    }
  }, [uiState.currentBellDefId])

  useEffect(() => {
    setBell(data?.bells[0])

    // Temp
    setBell(testingBell)
  }, [data])

  const clearcurrentBellDefId = () => {
    setUiState({ currentBellDefId: null })
  }

  return (
    <>
      {bell && (
        <div className={className}>
          <div className="container m-auto my-8">
            <Button
              className="fill"
              color="primary"
              onClick={clearcurrentBellDefId}
            >
              <Icon icon="left" /> {bell.bellhop_owner_id || "Facilities"}
            </Button>

            <div className="p-8 align-baseline">
              <h3>{bell?.name || "goal name"}</h3>
              <div>
                <span>From: </span>
                <span> BellOwnerName </span>
                <a href="">[bell owner bellhop ] </a>
                <span> to </span>
                <span>[bell assignee bellhop]</span>
              </div>
            </div>

            {bell?.blocks?.map((block) => {
              return <Goal block={block} key={bell.id} />
            })}
            <TODO>find bellhop by bell</TODO>
          </div>
        </div>
      )}
    </>
  )
}
