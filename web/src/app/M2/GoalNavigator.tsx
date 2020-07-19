import React, { useEffect, useState } from "react"
import { UI_STATE } from "../../operations/queries/uiState"
import { useQuery, useLazyQuery } from "@apollo/client"
import { BELLS_BY_PK } from "operations/queries/bellByPk"
import { Loader, Icon } from "rsuite"
import { Error } from "components/Misc"
import { TODO } from "components/TODO"
import { initialBell } from "../../../data/initialBell"
import { Button } from "components/Button"
import { setUiState } from "../../operations/mutations/setUiState"

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
    if (uiState.currentBellId) {
      getData({ variables: { id: uiState.currentBellId } })
    }
  }, [uiState.currentBellId])

  useEffect(() => {
    setBell(data?.bells[0])
  }, [data])

  const clearCurrentBellId = () => {
    setBell(null)
    setUiState({ currentBellId: null })
  }

  return (
    <>
      {bell && (
        <div className="absolute top-0 z-10 w-screen h-screen bg-default">
          <div className="container m-auto my-8">
            <Button
              className="fill"
              color="primary"
              onClick={clearCurrentBellId}
            >
              <Icon icon="left" /> Back
            </Button>
            <h3>{bell.name}</h3>
            <p>{uiState.currentBellId}</p>
            <TODO>find bellhop by bell</TODO>
          </div>
        </div>
      )}
      )
    </>
  )
}
