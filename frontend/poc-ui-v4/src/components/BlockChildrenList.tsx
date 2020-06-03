import React from "react"
import { Block, BlockDef, BlockOrDef } from "../models/interface"
import { BlockChildrenItem } from "./BlockChildrenItem"
import { DndTargetBox } from "./DndTargetBox"
import { MutationType } from "../models/enum"
import tw from "tailwind.macro"
import styled from "styled-components"
import { Panel, Notification } from "rsuite"
import cloneDeep from "lodash/cloneDeep"
import { GET_USERS } from "../operations/queries/getUsers"
import { setUiState } from "../operations/mutations/setUiState"
import { useQuery } from "@apollo/client"
import { UI_STATE } from "../operations/queries/uiState"
import { ConsoleSqlOutlined } from "@ant-design/icons"

type BlockChildrenListType = {
  blocks: BlockOrDef[]
  parent?: BlockOrDef
  type: string
}

const BlockChildrenListRaw: React.FC<BlockChildrenListType> = ({
  blocks,
  parent,
  type,
}) => {
  const { data, loading, error } = useQuery(UI_STATE)

  const findBlock = (root, target) => {
    if (root.id === target.id) return root
    let found
    for (const child of root.children) {
      found = findBlock(child, target)
      if (found) return found
    }
    return null
  }

  const addOneBlock = (childBlock) => {
    const { id, name } = childBlock
    const { id: pid, name: pname } = parent
    Notification.info({
      title: "adding a block",
      description: `from "${name}" to "${pname}"`,
    })
    const newDraftBlock = cloneDeep(data?.uiState?.draftBlock)
    const newParent = findBlock(newDraftBlock, parent)
    newParent.children = [...newParent.children, childBlock]
    setUiState({ draftBlock: newDraftBlock })
  }

  return (
    <Panel shaded collapsible defaultExpanded bodyFill>
      <DndTargetBox
        accept="block"
        greedy={false}
        onDrop={(childBlock) => addOneBlock(childBlock)}
      >
        {blocks
          .filter((block) => block.__mutation_type__ !== MutationType.Delete)
          .map((block: BlockOrDef, index: number) => {
            return (
              <BlockChildrenItem block={block} index={index} key={block.id} />
            )
          })}
      </DndTargetBox>
    </Panel>
  )
}

const BlockChildrenList: React.FC<BlockChildrenListType> = styled(
  BlockChildrenListRaw
)`
  ${tw`flex-auto m-1`}
`

export { BlockChildrenList }
