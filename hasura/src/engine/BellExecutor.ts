import { Block, BlockState } from "../types"
import { updateBlockState } from "./utils"
import invariant from "invariant"
import { evalBlockPreConditions } from "./PreConditions"

const onRun = async (block: Block, preCondResult: boolean = true) => {
  if (preCondResult) {
    if (block.children.length > 0) {
      updateBlockState(block.children[0], BlockState.Running)
      // TODO: do I need to reset other children state to Created?
    }
  }
}

const onChildStateChange = async (block: Block, child: Block) => {}

export default { onRun, onChildStateChange }
