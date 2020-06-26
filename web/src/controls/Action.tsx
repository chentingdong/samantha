import React, { Component } from "react"
import { useQuery } from "@apollo/client"
import { UI_STATE } from "../operations/queries/uiState"
import { useBlockMutations } from "../operations/mutations"

// TODO: import all forms and decorators reflectively
import SpendRequest from "./forms/spendRequest"
import SpendRequestApproval from "./forms/spendRequestApproval"
import Conditional from "./decorators/Conditional"
import Inverter from "./decorators/Inverter"
import Repeat from "./decorators/Repeat"
import ReTry from "./decorators/ReTry"
import { Block } from "../models/interface"

type ActionType = {
  block: Block
  setBlock: (block: Block) => void
}
const Action: React.FC<ActionType> = ({ block, setBlock }) => {
  let components = {
    SpendRequest: SpendRequest,
    SpendRequestApproval: SpendRequestApproval,
    Conditional: Conditional,
    Inverter: Inverter,
    Repeat: Repeat,
    ReTry: ReTry,
  }

  const { data, loading, error } = useQuery(UI_STATE)
  // TODO, list of forms
  const template = block?.control?.forms[0].template
  const TagName = components[template]
  let root = block?.root ? lock.root : block
  const form = root.context[template]
  const [createFn, updateFn] = useBlockMutations(data?.uiState?.editingTypename)

  // TODO: debounce happen here
  const submit = (form) => {
    const updatedContext = {
      ...root.context,
    }
    updatedContext[template] = form

    updateFn({
      variables: {
        data: { context: updatedContext },
        id: root.id,
      },
    })
  }

  return <TagName onSubmit={submit} form={form} />
}

export { Action }
