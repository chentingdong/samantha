import { Block, BlockState } from "./interfaces"
import { updateBlockState } from "./utils"
import invariant from "invariant"

const onRun = async (block: Block) => {
  console.log(`onRun: block: ${block.id} ${block.state}`)

  if (block.children.length > 0) {
    updateBlockState(block.children[0], BlockState.Running)
    // TODO: do I need to reset other children state to Created?
  }
}

const onChildStateChange = async (block: Block, child: Block) => {
  console.log(
    `onRun: block: ${block.id} ${block.state}, child: ${child.id} ${child.state}`
  )
  invariant(
    block.state === BlockState.Running,
    "Only Running blocks care about child state change."
  )

  if (child.state === BlockState.Failure) {
    const childIndex = block.children.findIndex((c: Block) => c.id === child.id)
    if (childIndex === block.children.length - 1) {
      updateBlockState(block, BlockState.Failure)
      return
    } else {
      // TODO: find the next child that's in Created state
      updateBlockState(block.children[childIndex + 1], BlockState.Running)
      return
    }
  }

  if (child.state === BlockState.Success) {
    updateBlockState(block, BlockState.Success)
    return
  }

  console.debug(
    `No action taken by parent {id: ${block.id}, name: ${block.name}, type: ${block.type}}`
  )
}

export default { onRun, onChildStateChange }
