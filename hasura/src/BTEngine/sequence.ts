import { Block, BlockState } from "./interfaces"
import { updateBlockState } from "./utils"
import invariant from "invariant"

const onRun = async (block: Block) => {
  console.log(`onRun: block: ${block.id} ${block.state}`)

  block.children.map((child: Block, index: number) =>
    console.debug(`onRun: child ${index}: ${child.id}`)
  )

  if (block.children.length > 0) {
    updateBlockState(block.children[0], BlockState.Running)
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

  block.children.map((child: Block, index: number) =>
    console.debug(`onChildStateChange child ${index}: ${child.id}`)
  )
  if (child.state === BlockState.Success) {
    const childIndex = block.children.findIndex((c: Block) => c.id === child.id)
    console.debug("childIndex: ", childIndex)
    if (childIndex === block.children.length - 1) {
      updateBlockState(block, BlockState.Success)
      return
    } else {
      updateBlockState(block.children[childIndex + 1], BlockState.Running)
      return
    }
  }

  if (child.state === BlockState.Failure) {
    updateBlockState(block, BlockState.Failure)
    return
  }

  console.debug(
    `No action taken by parent {id: ${block.id}, name: ${block.name}, type: ${block.type}}`
  )
}

export default { onRun, onChildStateChange }
