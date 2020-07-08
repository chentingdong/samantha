import React, { Component } from "react"
import { useQuery, useMutation } from "@apollo/client"
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
import { setUiState } from "../operations/mutations/setUiState"
import { UPDATE_ONE_BELL } from "../operations/mutations/updateOneBell"

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
  const [updateBell] = useMutation(UPDATE_ONE_BELL)

  // TODO: list of forms?
  const template = block?.control?.forms[0].template
  const TagName = components[template]
  const bell = block?.root?.bells[0]
  const form = bell?.context[template]
  const [createFn, updateFn] = useBlockMutations(data?.uiState?.editingTypename)
  if (loading) return <>Loading...</>

  // TODO: debounce happen here
  const submit = (form) => {
    const updatedContext = {
      ...bell.context,
    }
    updatedContext[template] = form

    updateBell({
      variables: {
        data: { context: updatedContext },
        id: bell.id,
      },
    })
  }
  const onSuccess = () => {
    setUiState({
      draftBlock: {
        state: "Success",
      },
    })

    updateFn({
      variables: {
        data: { state: "Success" },
        id: data?.uiState?.currentBlockId,
      },
    })
  }

  const onFailure = () => {
    setUiState({
      draftBlock: {
        state: "Failure",
      },
    })

    updateFn({
      variables: {
        data: { state: "Failure" },
        id: data?.uiState?.currentBlockId,
      },
    })
  }
  return (
    <TagName
      onSubmit={submit}
      form={form}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  )
}

export { Action }
