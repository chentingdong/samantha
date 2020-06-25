import React from "react"
import { useQuery } from "@apollo/client"
import { UI_STATE } from "../operations/queries/uiState"
import { BLOCK_BY_PK } from "../operations/queries/blockByPk"

function EditBlock(props) {
  const { data, loading, error } = useQuery(UI_STATE)
  const currentBlockId = data.uiState.currentBlockId
  console.log(currentBlockId)

  const { data: data2 } = useQuery(BLOCK_BY_PK, {
    variables: { id: currentBlockId },
  })
  console.log(data2)
  return <div>Edit a block and sync with apollo cache {currentBlockId}</div>
}

export default EditBlock
