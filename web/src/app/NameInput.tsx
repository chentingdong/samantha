import React, { useEffect, useState, useRef } from "react"
import { Input } from "rsuite"
import { UI_STATE } from "../operations/queries/uiState"
import { useQuery } from "@apollo/client"
import { setUiState } from "../operations/mutations/setUiState"
import { EditMode } from "../models/enum"
import { useBlockMutations } from "../operations/mutations"
import { debounce } from "../utils/debounce"

const NameInput = () => {
  const { data, loading, error } = useQuery(UI_STATE)
  const [createFn, updateFn] = useBlockMutations(data?.uiState?.editingTypename)

  const debouncedNameUpdate = useRef(
    debounce((draft) => {
      const dataInput: any = {
        name: draft.name,
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
      debouncedNameUpdate.current(data?.uiState?.draftBlock)
    }
  }, [data?.uiState?.draftBlock?.name])

  const nameInputRef = useRef(null)
  const [nameSelectionStart, setNameSelectionStart] = useState(0)

  useEffect(() => {
    if (
      nameInputRef?.current &&
      nameInputRef?.current.selectionStart !== nameSelectionStart
    ) {
      nameInputRef.current.setSelectionRange(
        nameSelectionStart,
        nameSelectionStart
      )
    }
  })

  if (!data) return <></>
  const { draftBlock } = data.uiState

  return (
    <Input
      name="name"
      inputRef={nameInputRef}
      value={draftBlock.name}
      onChange={(value, event) => {
        setNameSelectionStart(
          (event.currentTarget as HTMLInputElement).selectionStart
        )
        setUiState({
          draftBlock: { name: value },
        })
      }}
    />
  )
}

export { NameInput }
