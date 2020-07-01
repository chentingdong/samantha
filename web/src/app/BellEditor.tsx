import React, { useState, useEffect } from "react"
import { Drawer } from "../components/Drawer"
import { UI_STATE } from "../operations/queries/uiState"
import { useQuery, useMutation, useSubscription } from "@apollo/client"
import { setUiState } from "../operations/mutations/setUiState"
import { BELLS_BY_PK } from "../operations/queries/bellByPk"
import { GET_BELL } from "../operations/subscriptions/getBell"
import { BellTree } from "./BellTree"
import { EditBlock } from "./EditBlock"

function BellEditor(props) {
  const [bell, setBell] = useState({ name: "", description: "" })
  const { data, loading, error } = useQuery(UI_STATE)
  const { data: bellResult, loading: loadingBell } = useQuery(BELLS_BY_PK, {
    variables: { id: data?.uiState.currentBellId },
  })

  if (loading) return <>Loading...</>
  if (loadingBell) return <>Loading Bell</>

  if (bellResult.length > 0) setBell(bellResult.bells[0])

  const close = () => {
    setUiState({ showBellEditor: false })
  }

  return (
    <div className="editor">
      <Drawer show={data?.uiState?.showBellEditor} close={close}>
        <div className="container mx-auto">
          <h2>Editing Bell</h2>
          <label>Name</label>
          <div>{bell.name}</div>
          <label>Description</label>
          <div>{bell.description}</div>
        </div>
        <BellTree bell={bellResult.bells[0]} />
        <div className="container mx-auto">
          <EditBlock blockId={data?.uiState?.currentBlockId} />
        </div>
      </Drawer>
    </div>
  )
}

export { BellEditor }
