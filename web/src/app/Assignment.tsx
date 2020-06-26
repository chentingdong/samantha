import React from "react"
import { BlockOrDef } from "../models/interface"
import { TagPicker } from "../components/TagPicker"
import { useQuery, useMutation } from "@apollo/client"
import { UI_STATE } from "../operations/queries/uiState"
import { GET_USERS } from "../operations/queries/getUsers"
import { EditMode } from "../models/enum"
import { INSERT_BLOCK_REQUESTOR } from "../operations/mutations/insertBlockRequestor"
import { DELETE_BLOCK_REQUESTOR } from "../operations/mutations/deleteBlockRequestor"
import { INSERT_BLOCK_RESPONDER } from "../operations/mutations/insertBlockResponder"
import { DELETE_BLOCK_RESPONDER } from "../operations/mutations/deleteBlockResponder"

type AssignmentType = {
  block: BlockOrDef
  setBlock: (block: BlockOrDef) => void
}
const Assignment: React.FC<AssignmentType> = ({ block, setBlock }) => {
  const { data, loading, error } = useQuery(UI_STATE)
  const {
    data: { users },
  } = useQuery(GET_USERS)
  const [insertBlockRequestor] = useMutation(INSERT_BLOCK_REQUESTOR)
  const [deleteBlockRequestor] = useMutation(DELETE_BLOCK_REQUESTOR)
  const [insertBlockResponder] = useMutation(INSERT_BLOCK_RESPONDER)
  const [deleteBlockResponder] = useMutation(DELETE_BLOCK_RESPONDER)

  const chooseRequestors = (value) => {
    const requestors = value.map((selectedUser) => ({
      user: users.find((user) => user.id === selectedUser.id),
    }))
    setBlock({ ...block, requestors: requestors })
  }

  const chooseResponders = (value) => {
    const responders = value.map((selectedUser) => ({
      user: users.find((user) => user.id === selectedUser.id),
    }))
    setBlock({ ...block, responders: responders })
  }

  const insertRequestor = (value) => {
    if (data?.uiState?.editorMode === EditMode.Edit) {
      insertBlockRequestor({
        variables: {
          object: {
            block_id: block.id,
            user_id: value.id,
          },
        },
      })
    }
  }

  const deleteRequestor = (value) => {
    if (data?.uiState?.editorMode === EditMode.Edit) {
      deleteBlockRequestor({
        variables: {
          block_id: block.id,
          user_id: value.id,
        },
      })
    }
  }

  const insertResponder = (value) => {
    if (data?.uiState?.editorMode === EditMode.Edit) {
      insertBlockResponder({
        variables: {
          object: {
            block_id: block.id,
            user_id: value.id,
          },
        },
      })
    }
  }

  const deleteResponder = (value) => {
    if (data?.uiState?.editorMode === EditMode.Edit) {
      deleteBlockResponder({
        variables: {
          block_id: block.id,
          user_id: value.id,
        },
      })
    }
  }

  return (
    <div className="flex">
      <div className="flex-1 mr-4">
        <label>Requestors</label>
        <TagPicker
          data={users}
          value={block.requestors.map((user) => user.user)}
          onChange={(value) => chooseRequestors(value)}
          onInsertTag={(value) => insertRequestor(value)}
          onDeleteTag={(value) => deleteRequestor(value)}
        />
      </div>
      <div className="flex-1">
        <label>Responders</label>
        <TagPicker
          data={users}
          value={block.responders.map((user) => user.user)}
          onChange={(value) => chooseResponders(value)}
          onInsertTag={(value) => insertResponder(value)}
          onDeleteTag={(value) => deleteResponder(value)}
        />
      </div>
    </div>
  )
}

export { Assignment }
