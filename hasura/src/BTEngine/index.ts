import { BlockTypeMap, Block } from "./interfaces"
import retry from "./retry"
import conditional from "./conditional"
import sequence from "./sequence"

const blockTypeMap: BlockTypeMap = {
  Retry: retry,
  Sequence: sequence,
  Conditional: conditional,
}

export const run = async (block: Block) => {
  const func = blockTypeMap[block.type]
  if (func === undefined) {
    console.log(`Block type ${block.type} is not supported.`)
    return
  }
  await func(block)
}
