import React, { useEffect } from "react"
import { BlockOrDef, Block } from "../../models/interface"
import { EditMode, ItemOrigin, Typename } from "../../models/enum"
import { AUTH_USER } from "../../operations/queries/authUser"
import { UI_STATE } from "../../operations/queries/uiState"
import { useQuery, useMutation } from "@apollo/client"
import styled from "styled-components"
import tw from "tailwind.macro"
import { setUiState } from "../../operations/mutations/setUiState"
import { createBlock } from "../../operations/blockOperations"
import cloneDeep from "lodash/cloneDeep"
import { UPDATE_ONE_BLOCK } from "../../operations/mutations/updateOneBlock"
import moment from "moment"
import { Button } from "../../components/Button"

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
    blockToComplete.children.map(({ child }) => markComplete(child))
    updateOneBlock({
      variables: {
        data: { state: "Success", last_updated: new Date() },
        id: blockToComplete.id,
      },
    })
  }

  const viewEditNew = () => {
    const editingTypename =
      block.__typename === Typename.blocks
        ? Typename.blocks
        : Typename.blockDefs

    if (block.__typename === Typename.blocks) {
      setUiState({
        showBellEditor: true,
        showEditor: false,
        currentBlockId: block.id,
        currentBellId: block?.bells.length > 0 ? block?.bells[0].id : null,
      })
    } else {
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
  }

  const makeBell = () => {
    setUiState(
      {
        showEditor: true,
        editingTypename: Typename.blocks,
        editorMode: EditMode.Create,
        draftBlock: createBlock(
          block.id,
          cloneDeep(block),
          Typename.blocks,
          authUser
        ),
      },
      true
    )
  }

  const stateStyle = (blockWithState) => {
    return blockWithState.state || "default"
  }

  if (!authUserResult || !data) return <></>

  const { authUser } = authUserResult

  return (
    <div className={className}>
      <div className="w-full grid sm:grid-cols-3 lg:grid-cols-4 p-2">
        <div className="col-span-2 lg:col-span-3">
          {itemOrigin !== ItemOrigin.Catalog && (
            <div>
              <span className="requestors">
                {(block as Block).requestors
                  ?.map((user) => user.user.name)
                  .join(", ")}
                {":  "}
              </span>
              <span className="time">{moment(block.created_at).fromNow()}</span>
            </div>
          )}
          <div>
            <span className="block-name"> {block.name} </span>
            <span className="responders">
              {(block as Block).responders
                ?.map((user) => "@" + user.user.name)
                .join(", ")}
            </span>
          </div>
          <div>
            {block.children?.map(({ child }) => {
              return (
                <div
                  className={`block-state block-state-${stateStyle(child)}`}
                  key={child.id}
                >
                  &nbsp;{child.name}
                </div>
              )
            })}
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 lg:grid-col-1">
          <Button
            icon="edit"
            className="w-3/4 mx-auto"
            fill={false}
            color="primary"
            onClick={(e) => viewEditNew(e)}
          >
            View/Edit <i>New!</i>
          </Button>

          {itemOrigin !== ItemOrigin.Catalog &&
            (block as Block)?.state !== "Success" && (
              <Button
                color="primary"
                fill={false}
                icon="check"
                className="w-3/4 mx-auto"
                onClick={() => markComplete(block)}
              >
                Mark as Complete
              </Button>
            )}
          {itemOrigin === ItemOrigin.Catalog && (
            <Button
              color="primary"
              fill={false}
              icon="bell-o"
              className="make-a-bell w-3/4 mx-auto"
              onClick={makeBell}
            >
              Make a Bell
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

const RequestItem = styled(React.memo(RequestItemRaw))`
  ${tw`p-2 my-2 rounded-t shadow`}
  color: var(--color-text-default);
  background: var(--color-bg-default);
  .block-state {
    ${tw`mr-1 my-2 p-1 text-sm rounded-t`}
    min-width: 2em;
    display: inline-block;
    color: var(--color-text-primary);
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
    color: var(--color-text-disabled);
    background: var(--color-bg-disabled);
  }
  .requestors {
    font-size: 0.9em;
    font-family: var(--font-body);
  }
  .responders {
    color: var(--color-text-default);
    font-size: 0.75em;
  }
  .block-name {
    color: var(--color-text-default);
    font-size: 1.1em;
    font-family: var(--font-body);
  }
  .time {
    font-size: 0.75em;
    color: var(--color-text-primary-soft);
  }
`

export { RequestItem }
