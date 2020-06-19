import React, { useEffect, useState, useRef } from "react"
import { Input } from "rsuite"
import { UI_STATE } from "../operations/queries/uiState"
import { useQuery } from "@apollo/client"
import { setUiState } from "../operations/mutations/setUiState"
import { EditMode } from "../models/enum"
import { useBlockMutations } from "../operations/mutations"
import { debounce } from "../utils/debounce"
import { usePrevious } from "../utils/hooks"
import get from "lodash/get"

type DraftControlledInputType = {
  fieldName: string
  className?: string
  type?: string
}
const DraftControlledInput: React.FC<DraftControlledInputType> = ({
  fieldName,
  className = "",
  type = "text",
}) => {
  const { data, loading, error } = useQuery(UI_STATE)
  const [createFn, updateFn] = useBlockMutations(data?.uiState?.editingTypename)

  const debouncedUpdate = useRef(
    debounce((draft) => {
      const dataInput: any = {
        [fieldName]: get(draft, fieldName),
        last_updated: new Date(),
      }
      updateFn({
        variables: {
          data: dataInput,
          id: draft.id,
        },
      })
    }, 1000)
  )

  useEffect(() => {
    if (data?.uiState?.editorMode === EditMode.Edit) {
      debouncedUpdate.current(data?.uiState?.draftBlock)
    }
  }, [get(data?.uiState?.draftBlock, fieldName)])

  const inputRef = useRef(null)
  const [selectionStart, setSelectionStart] = useState(0)
  const prevSelectionStart = usePrevious(selectionStart)

  useEffect(() => {
    if (
      inputRef?.current &&
      inputRef?.current.selectionStart !== prevSelectionStart
    ) {
      inputRef.current.setSelectionRange(prevSelectionStart, prevSelectionStart)
    }
  }, [inputRef?.current?.selectionStart])

  if (!data) return <></>
  const { draftBlock } = data.uiState

  return (
    <>
      {/* TODO: Rewrite the following properly? */}
      {type === "text" && (
        <Input
          rows={5}
          name={fieldName}
          inputRef={inputRef}
          className={className}
          value={get(draftBlock, fieldName)}
          onChange={(value, event) => {
            setSelectionStart(
              (event.currentTarget as HTMLTextAreaElement).selectionStart
            )
            setUiState({
              draftBlock: { [fieldName]: value },
            })
          }}
        />
      )}
      {type === "number" && (
        <Input
          name={fieldName}
          type={type}
          min="0.0"
          max="10000.0"
          // inputRef={inputRef}
          className={className}
          value={get(draftBlock, fieldName)}
          // onChange={(value, event) => {
          //   setSelectionStart(
          //     (event.currentTarget as HTMLTextAreaElement).selectionStart
          //   )
          //   setUiState({
          //     draftBlock: { [fieldName]: value },
          //   })
          // }}
        />
      )}
    </>
  )
}

export { DraftControlledInput }
