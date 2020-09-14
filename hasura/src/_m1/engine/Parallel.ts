import { Block, BlockState } from "./interfaces"
import { updateBlockState } from "./utils"
import invariant from "invariant"

const onRun = async (block: Block) => {
  console.log(`onRun: block: ${block.id} ${block.state}`)

  block.children.map(({ child }) => updateBlockState(child, BlockState.Running))
}

const onChildStateChange = async (block: Block, child: Block) => {
  console.log(
    `onChildStateChange: block: ${block.id} ${block.state}, child: ${child.id} ${child.state}`
  )

  if (child.state === BlockState.Success) {
    const successChildren = block.children.filter(
      ({ child: c }) => c.state === BlockState.Success
    )
    if (successChildren.length === block.children.length) {
      updateBlockState(block, BlockState.Success)
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
