import { Block, BlockState } from "../types"
import { updateBlockState } from "./utils"
import invariant from "invariant"
import { evalBlockPreConditions } from "./PreConditions"

const onRun = async (block: Block) => {
  console.log(`onRun: block: ${block.id} ${block.state}`)

  const result = await evalBlockPreConditions(block)
  console.log("result: ", result)
  if (result) {
    updateBlockState(block, BlockState.Success)
  }
}

const onChildStateChange = async (block: Block, child: Block) => {
  console.log(
    `onChildStateChange: block: ${block.id} ${block.state}, child: ${child.id} ${child.state}`
  )
  invariant(
    block.state === BlockState.Running,
    "Only Running blocks care about child state change."
  )
  console.debug(
    `No action taken by parent {id: ${block.id}, name: ${block.name}, type: ${block.type}}`
  )
}

export default { onRun, onChildStateChange }
