import React, { useState, useReducer, useEffect } from "react"
import { BlockOrDef, Block } from "../models/interface"
import { EditMode, ItemOrigin, MutationType, Typename } from "../models/enum"
import { AUTH_USER } from "../operations/queries/authUser"
import { UI_STATE } from "../operations/queries/uiState"
import { useQuery, useMutation } from "@apollo/client"
import { Grid, Row, Col, IconButton, Icon } from "rsuite"
import styled from "styled-components"
import tw from "tailwind.macro"
import { setUiState } from "../operations/mutations/setUiState"
import { createBlock } from "../operations/blockOperations"
import cloneDeep from "lodash/cloneDeep"
import { UPDATE_ONE_BLOCK } from "../operations/mutations/updateOneBlock"
import moment from "moment"

type RequestItemType = {
  block: BlockOrDef
  itemOrigin?: ItemOrigin
  className?: string
}

const RequestItemRaw: React.FC<RequestItemType> = ({
  block,
  itemOrigin = ItemOrigin.Catalog,
  className = "",
}) => {
  const { data: authUserResult } = useQuery(AUTH_USER)
  const { data } = useQuery(UI_STATE)
  const [updateOneBlock] = useMutation(UPDATE_ONE_BLOCK)

  // update draftBlock if remote block has changed. used for co-editing demo. may not be efficient
  useEffect(() => {
    if (
      block?.last_updated &&
      data?.uiState?.draftBlock?.last_updated &&
      block?.id === data?.uiState?.draftBlock?.id
    ) {
      if (
        moment(block?.last_updated).toISOString() >
        moment(data?.uiState?.draftBlock?.last_updated).toISOString()
      ) {
        const editingTypename =
          block.__typename === "blocks" ? Typename.blocks : Typename.blockDefs
        setUiState({
          editingTypename,
          editorMode: EditMode.Edit,
          draftBlock: { ...block, __typename: editingTypename },
        })
      }
    }
  }, [block])

  const markComplete = (blockToComplete) => {
    blockToComplete.children.map((child) => markComplete(child))
    updateOneBlock({
      variables: {
        data: { state: "Success", last_updated: new Date() },
        id: blockToComplete.id,
      },
    })
  }

  const viewEditNew = (e) => {
    const editingTypename =
      block.__typename === Typename.blocks
        ? Typename.blocks
        : Typename.blockDefs
    setUiState(
      {
        showEditor: true,
        editingTypename,
        editorMode: EditMode.Edit,
        draftBlock: { ...block, __typename: editingTypename },
      },
      true
    )
  }

  const makeBell = () => {
    setUiState(
      {
        showEditor: true,
        editingTypename: Typename.blocks,
        editorMode: EditMode.Create,
        draftBlock: createBlock(cloneDeep(block), Typename.blocks, authUser),
      },
      true
    )
  }

  const stateStyle = (blockWithState) => {
    return blockWithState.state || "default"
  }

  if (!authUserResult || !data) return <></>

  const { authUser } = authUserResult
  const { draftBlock } = data.uiState

  return (
    <div className={className}>
      <Grid fluid>
        <Col xs={18}>
          {itemOrigin !== ItemOrigin.Catalog && (
            <Row>
              <span className="requestors">
                {(block as Block).block_requestors
                  ?.map((user) => user.user.name)
                  .join(", ")}
                {":  "}
              </span>
              <span className="time">{moment(block.created_at).fromNow()}</span>
            </Row>
          )}
          <Row>
            <span className="block-name"> {block.name} </span>
            <span>{block.id}</span>
            <span className="responders">
              {(block as Block).block_responders
                ?.map((user) => "@" + user.user.name)
                .join(", ")}
            </span>
          </Row>
          <Row>
            <div className="flex flex-row">
              {block.children?.map((child) => {
                return (
                  <span
                    className={`block-state block-state-${stateStyle(child)}`}
                    key={child.id}
                  >
                    {child.name}
                  </span>
                )
              })}
            </div>
          </Row>
        </Col>
        <Col xs={6} className="grid grid-cols-1 gap-1">
          <IconButton
            appearance="ghost"
            icon={<Icon icon="edit" />}
            onClick={(e) => viewEditNew(e)}
          >
            View/Edit <i>New!</i>
          </IconButton>
          {itemOrigin !== ItemOrigin.Catalog &&
            (block as Block).state !== "Success" && (
              <IconButton
                appearance="ghost"
                icon={<Icon icon="check" />}
                onClick={() => markComplete(block)}
              >
                Mark as Complete
              </IconButton>
            )}
          {itemOrigin === ItemOrigin.Catalog && (
            <IconButton
              appearance="ghost"
              icon={<Icon icon="bell-o" />}
              className="make-a-bell"
              onClick={makeBell}
            >
              Make a Bell
            </IconButton>
          )}
        </Col>
      </Grid>
    </div>
  )
}

const RequestItem = styled(React.memo(RequestItemRaw))`
  ${tw`p-2 pb-4 my-2 rounded border shadow`}
  color: var(--color-text-default);
  background: var(--color-bg-default);
  .block-state {
    ${tw`border mr-1 my-2 p-1 text-sm rounded`}
    color: var(--color-text-secondary);
    background: var(--color-bg-primary);
  }
  .block-state-DRAFT {
    color: var(--color-text-warning);
    background: var(--color-bg-warning);
  }
  .block-state-PENDING {
    color: var(--color-text-warning);
    background: var(--color-bg-warning);
  }
  .block-state-ACTIVE {
    color: var(--color-text-success);
    background: var(--color-bg-success);
  }
  .block-state-COMPLETE {
    color: var(--color-text-inverse);
    background: var(--color-bg-primary);
  }
  .requestors {
    font-size: 0.9rem;
    font-family: var(--font-body);
  }
  .responders {
    color: var(--color-text-default);
    font-size: 0.75rem;
  }
  .block-name {
    color: var(--color-text-primary);
    font-size: 1.1rem;
    font-family: var(--font-body);
  }
  .time {
    font-size: 0.75rem;
    color: var(--color-text-primary-soft);
  }
`

export { RequestItem }
