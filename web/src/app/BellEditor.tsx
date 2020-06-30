import React from "react"
import { Drawer } from "../components/Drawer"
import { UI_STATE } from "../operations/queries/uiState"
import { useQuery, useMutation, useSubscription } from "@apollo/client"
import { setUiState } from "../operations/mutations/setUiState"
import { GET_BLOCK } from "../operations/subscriptions/getBlock"
import { BellTree } from "./BellTree"
import EditBlock from "./EditBlock"

function BellEditor(props) {
  const { data, loading, error } = useQuery(UI_STATE)
  const { data: blockResult } = useSubscription(GET_BLOCK, {
    variables: { id: data?.uiState?.draftBlock?.id },
  })

  const close = () => {
    setUiState({ showBellEditor: false })
  }

  return (
    <div className="editor">
      <Drawer show={data?.uiState?.showBellEditor} close={close}>
        <h2>Editing Bell</h2>
        <BellTree data={blockResult?.blocks_by_pk} />
        <EditBlock blockId={data.uiState.currentBlockId} />
      </Drawer>
    </div>
  )
}

export { BellEditor }
