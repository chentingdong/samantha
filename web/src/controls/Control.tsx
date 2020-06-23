import React, { Component } from "react"
import { useQuery } from "@apollo/client"
import { UI_STATE } from "../operations/queries/uiState"
import { useBlockMutations } from "../operations/mutations"
import { setUiState } from "../operations/mutations/setUiState"
import { BLOCK } from "../operations/queries/block"

// TODO: import all forms and decorators reflectively
import SpendRequest from "./forms/spendRequest"
import SpendRequestApproval from "./forms/spendRequestApproval"

const Control: React.FC<{}> = () => {
  let components = {
    SpendRequest: SpendRequest,
    SpendRequestApproval: SpendRequestApproval,
  }

  const { data, loading, error } = useQuery(UI_STATE)
  const template = data?.uiState?.draftBlock?.control?.template
  const TagName = components[template]
  let root =
    data?.uiState?.draftBlock?.root === null
      ? data?.uiState?.draftBlock
      : data?.uiState?.draftBlock?.root
  const form = root.context?.TagName

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
