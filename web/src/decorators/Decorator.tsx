import React, { Component } from "react"
import { useQuery } from "@apollo/client"
import { UI_STATE } from "../operations/queries/uiState"
import { useBlockMutations } from "../operations/mutations"
import { setUiState } from "../operations/mutations/setUiState"

type DecoratorType = {
  tagName: string
}

const Decorator: React.FC<DecoratorType> = ({ tagName = "" }) => {
  let components = {}
  const { data, loading, error } = useQuery(UI_STATE)
  const decorator = data?.uiState?.draftBlock?.context?.decorator

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
        parent: null,
      },
    })
  }

  const TagName = components[tagName]
  return <TagName onSubmit={submit} decorator={decorator} />
}

export { Decorator, DecoratorType }
