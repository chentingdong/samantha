import React, { useEffect, useState, useRef } from "react"
import { Input } from "rsuite"
import { UI_STATE } from "../operations/queries/uiState"
import { useQuery } from "@apollo/client"
import { setUiState } from "../operations/mutations/setUiState"
import { EditMode } from "../models/enum"
import { useBlockMutations } from "../operations/mutations"
import { debounce } from "../utils/debounce"

const DescriptionInput = () => {
  const { data, loading, error } = useQuery(UI_STATE)
  const [createFn, updateFn] = useBlockMutations(data?.uiState?.editingTypename)

  const debouncedDescriptionUpdate = useRef(
    debounce((draft) => {
      const dataInput: any = {
        description: draft.description,
        last_updated: new Date(),
      }
      updateFn({
        variables: {
          data: dataInput,
          where: {
            id: draft.id,
          },
        },
      })
    }, 1000)
  )

  useEffect(() => {
    if (data?.uiState?.editorMode === EditMode.Edit) {
      debouncedDescriptionUpdate.current(data?.uiState?.draftBlock)
    }
  }, [data?.uiState?.draftBlock?.description])

  const descriptionInputRef = useRef(null)
  const [descriptionSelectionStart, setDescriptionSelectionStart] = useState(0)

  useEffect(() => {
    if (
      descriptionInputRef?.current &&
      descriptionInputRef?.current.selectionStart !== descriptionSelectionStart
    ) {
      descriptionInputRef.current.setSelectionRange(
        descriptionSelectionStart,
        descriptionSelectionStart
      )
    }
  })

  if (!data) return <></>
  const { draftBlock } = data.uiState

  return (
    <Input
      rows={5}
      name="description"
      inputRef={descriptionInputRef}
      componentClass="textarea"
      value={draftBlock.description}
      onChange={(value, event) => {
        setDescriptionSelectionStart(
          (event.currentTarget as HTMLTextAreaElement).selectionStart
        )
        setUiState({
          draftBlock: { description: value },
        })
      }}
    />
  )
}

export { DescriptionInput }
