import React, { useState, useReducer } from "react"
import uuid from "uuid"
import { BlockOrDef, Block } from "../models/interface"
import { EditMode, ItemOrigin, MutationType, Typename } from "../models/enum"
import { AUTH_USER } from "../operations/queries/authUser"
import { useQuery, useMutation } from "@apollo/client"
import { reducer } from "../context/reducer"
import { Grid, Row, Col, IconButton, Icon } from "rsuite"
import { Card } from "./Card"
import styled from "styled-components"
import tw from "tailwind.macro"
import { Button } from "./Button"
import { setUiState } from "../operations/mutations/setUiState"
import { createBlock } from "../operations/blockOperations"
import cloneDeep from "lodash/cloneDeep"
import { UPDATE_ONE_BLOCK } from "../operations/mutations/updateOneBlock"

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
  const { data } = useQuery(AUTH_USER)
  const [updateOneBlock] = useMutation(UPDATE_ONE_BLOCK)

  const markComplete = (blockToComplete) => {
    blockToComplete.children.map((child) => markComplete(child))
    updateOneBlock({
      variables: {
        data: { state: "COMPLETE", last_updated: new Date() },
        where: { id: blockToComplete.id },
      },
    })
  }

  const stateStyle = (blockWithState) => {
    return blockWithState.state || "default"
  }

  return (
    <Card className={className}>
      <Grid fluid>
        <Col xs={18}>
          <h4>
            <span>{block.name} </span>
            {itemOrigin !== ItemOrigin.Catalog && (
              <span className={`block-state-${stateStyle(block)}`}>
                ({(block as Block).state})
              </span>
            )}
          </h4>
          <p>{block.description}</p>
          <div className="flex flex-row">
            {block.children?.map((child) => {
              return (
                <span
                  className={`child block-state-${stateStyle(child)}`}
                  key={child.id}
                >
                  {child.name}
                </span>
              )
            })}
          </div>
          {itemOrigin === ItemOrigin.Made && (
            <p className="text-secondary">
              "Assigned to: "
              {(block as Block).responders?.map((user) => user.name).join(", ")}
            </p>
          )}
          {itemOrigin === ItemOrigin.Received && (
            <p className="text-secondary">
              {"Requested by: "}
              {(block as Block).requestors?.map((user) => user.name).join(", ")}
            </p>
          )}
        </Col>
        <Col xs={6} className="grid grid-cols-1 gap-1">
          {itemOrigin !== ItemOrigin.Catalog &&
            (block as Block).state !== "COMPLETE" && (
              <IconButton
                appearance="default"
                icon={<Icon icon="check" />}
                onClick={() => markComplete(block)}
              >
                Mark as Complete
              </IconButton>
            )}
          {itemOrigin === ItemOrigin.Catalog && (
            <IconButton
              appearance="default"
              icon={<Icon icon="bell-o" />}
              onClick={() => {
                setUiState(
                  {
                    showEditor: true,
                    editingTypename: Typename.Block,
                    editorMode: EditMode.Create,
                    draftBlock: createBlock(
                      cloneDeep(block),
                      Typename.Block,
                      data?.authUser
                    ),
                  },
                  true
                )
              }}
            >
              Make a Bell
            </IconButton>
          )}
          <IconButton
            appearance="default"
            icon={<Icon icon="edit" />}
            onClick={(e) => {
              const editingTypename =
                block.__typename === "Block"
                  ? Typename.Block
                  : Typename.BlockDef
              setUiState(
                {
                  showEditor: true,
                  editingTypename,
                  editorMode: EditMode.Edit,
                  draftBlock: { ...block, __typename: editingTypename },
                },
                true
              )
            }}
          >
            View/Edit <i>New!</i>
          </IconButton>
        </Col>
      </Grid>
    </Card>
  )
}

const RequestItem = styled(RequestItemRaw)`
  ${tw`p-2 pb-4 my-2 rounded border shadow`}
  border-style: dotted;
  border-color: var(--color-text-secondary);
  .editor {
    transition: left 2s;
  }
  .child {
    ${tw`border mr-1 my-2 p-1 text-sm rounded`}
  }
  .block-state-DRAFT {
    color: gray;
  }
  .block-state-PENDING {
    color: var(--color-text-secondary);
  }
  .block-state-ACTIVE {
    color: var(--color-text-primary);
  }
  .block-state-COMPLETE {
    color: var(--color-text-inverse);
  }
`

export { RequestItem }
// export { RequestItem, ItemOrigin }
