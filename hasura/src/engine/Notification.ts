import { Block, BlockState } from "../types"
import { updateBlockState } from "./utils"
import invariant from "invariant"
import { evalBlockPreConditions } from "./PreConditions"

const onRun = async (block: Block, preCondResult: boolean = true) => {
  if (preCondResult) {
    updateBlockState(block, BlockState.Success)
  }
}

const onChildStateChange = async (block: Block, child: Block) => {
  console.debug(
    `No action taken by parent {id: ${block.id}, name: ${block.name}, type: ${block.type}}`
  )
}

export default { onRun, onChildStateChange }
