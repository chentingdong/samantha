import React, { Component } from "react"
import { useQuery } from "@apollo/client"
import { UI_STATE } from "../operations/queries/uiState"
import { useBlockMutations } from "../operations/mutations"
import { setUiState } from "../operations/mutations/setUiState"

import DataBinding from "./DataBinding"
import ExitDecorator from "./ExitDecorator"
import PreCondition from "./PreCondition"
import Retry from "./ReTry"

type DecoratorType = {
  tagName: string
}

const Decorator: React.FC<DecoratorType> = ({ tagName = "" }) => {
  const { data, loading, error } = useQuery(UI_STATE)
  const decorator = data?.uiState?.draftBlock?.context?.decorator

  const components = {
    DataBinding: DataBinding,
    ExitDecorator: ExitDecorator,
    PreCondition: PreCondition,
    Retry: Retry,
  }

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
