import React, { Component } from "react"
import { SpendRequestForm } from "./spendRequestForm"
import SpendRequestApproval from "./spendRequestApproval"
import { useForm, FormContext } from "react-hook-form"
import { useQuery } from "@apollo/client"
import { UI_STATE } from "../operations/queries/uiState"
import { useBlockMutations } from "../operations/mutations"
import { setUiState } from "../operations/mutations/setUiState"

type ActionType = {
  tagName: string
}

const Action: React.FC<ActionType> = ({ tagName = "" }) => {
  let components = {}
  const { data, loading, error } = useQuery(UI_STATE)
  const form = data?.uiState?.draftBlock?.context?.form
  const [updateFn] = useBlockMutations(data?.uiState?.editingTypename)

  // TODO: debouncedSubmit
  const submit = (form) => {
    console.log(form)
    const newContext = {
      form: form,
      ...data?.uiState?.draftBlock.context,
    }
    setUiState({
      draftBlock: {
        context: newContext,
      },
    })
  }

  components["SpendRequestForm"] = SpendRequestForm
  components["SpendRequestApproval"] = SpendRequestApproval

  const TagName = components[tagName]
  return <TagName onSubmit={submit} form={form} />
}

export { Action, ActionType }
