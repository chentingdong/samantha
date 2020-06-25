import { Block, BlockTypeMap } from "./interfaces"
import sequence from "./sequence"

const blockTypeMap: BlockTypeMap = {
  Sequence: sequence,
}

export const onRun = async (block: Block) => {
  const blockType = blockTypeMap[block.type]
  if (blockType === undefined) {
    console.log(`Block type ${block.type} doesn't have onRun().`)
    return
  }
  await blockType.onRun(block)
}

export const onChildStateChange = async (block: Block, child: Block) => {
  const blockType = blockTypeMap[block.type]
  if (blockType === undefined) {
    console.log(`Block type ${block.type} doesn't have onChildStateChange()`)
    return
  }
  await blockType.onChildStateChange(block, child)
}
