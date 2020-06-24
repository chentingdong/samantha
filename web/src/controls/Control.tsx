import React, { Component } from "react"
import { useQuery } from "@apollo/client"
import { UI_STATE } from "../operations/queries/uiState"
import { useBlockMutations } from "../operations/mutations"
import { setUiState } from "../operations/mutations/setUiState"

// TODO: import all forms and decorators reflectively
import SpendRequest from "./forms/spendRequest"
import SpendRequestApproval from "./forms/spendRequestApproval"
import Conditional from "./decorators/Conditional"
import Inverter from "./decorators/Inverter"
import Repeat from "./decorators/Repeat"
import ReTry from "./decorators/ReTry"

const Control: React.FC<{}> = () => {
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
  const template = data?.uiState?.draftBlock?.control?.forms[0].template
  const TagName = components[template]
  let root =
    data?.uiState?.draftBlock?.root === null
      ? data?.uiState?.draftBlock
      : data?.uiState?.draftBlock?.root
  const form = root.context[template]
  const [createFn, updateFn] = useBlockMutations(data?.uiState?.editingTypename)

  // TODO: debounce happen here
  const submit = (form) => {
    const updatedContext = {
      ...root.context,
    }
    updatedContext[template] = form

    setUiState({
      draftBlock: {
        ...data?.uiState?.draftBlock,
        context: updatedContext,
      },
    })

    updateFn({
      variables: {
        data: { context: updatedContext },
        id: root.id,
      },
    })
  }

  return <TagName onSubmit={submit} form={form} />
}

export { Control }
