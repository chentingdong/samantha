import React, { useEffect } from "react"
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
    variables: { id: data?.uiState?.currentBlockId },
  })

  useEffect(() => {
    if (blockResult?.blocks_by_pk)
      setUiState({ currentBlockId: blockResult.blocks_by_pk.id })
  }, [])

  const close = () => {
    setUiState({ showBellEditor: false })
  }

  return (
    <div className="editor">
      <Drawer show={data?.uiState?.showBellEditor} close={close}>
        <h2>Editing Bell</h2>
        <BellTree data={blockResult?.blocks_by_pk} />
        <div className="container mx-auto">
          <EditBlock blockId={data?.uiState?.currentBlockId} />
        </div>
      </Drawer>
    </div>
  )
}

export { BellEditor }
