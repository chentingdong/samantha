import { Block, BlockState } from "../../types"
import { updateBlockState } from "./utils"
import invariant from "invariant"
import { evalBlockPreConditions } from "./PreConditions"

const onRun = async (block: Block) => {
  console.log(`onRun: block: ${block.id} ${block.state}`)

  const result = await evalBlockPreConditions(block)
  console.log("result: ", result)

  if (result) {
    if (block.configs.control_type === "Sequential") {
      if (block.children.length > 0) {
        updateBlockState(block.children[0], BlockState.Running)
        // TODO: do I need to reset other children state to Created?
      }
    } else if (block.configs.control_type === "Parallel") {
      block.children.map((child) => updateBlockState(child, BlockState.Running))
    }
  } else {
    updateBlockState(block, BlockState.Success)
    block.children.map((child) => updateBlockState(child, BlockState.Success))
  }
}

const onChildStateChange = async (block: Block, child: Block) => {
  console.log(
    `onChildStateChange: block: ${block.id} ${block.state}, child: ${child.id} ${child.state}`
  )

  if (block.configs.control_type === "Sequential") {
    if (child.state === BlockState.Success) {
      const childIndex = block.children.findIndex((c) => c.id === child.id)
      if (childIndex === block.children.length - 1) {
        updateBlockState(block, BlockState.Success)
        return
      } else if (childIndex >= 0) {
        // TODO: find the next child that's in Created state
        updateBlockState(block.children[childIndex + 1], BlockState.Running)
        return
      }
    }

    if (child.state === BlockState.Failure) {
      updateBlockState(block, BlockState.Failure)
      return
    }
  } else if (block.configs.control_type === "Parallel") {
    if (child.state === BlockState.Success) {
      const successChildren = block.children.filter(
        (c) => c.state === BlockState.Success
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
  }

  console.debug(
    `No action taken by parent {id: ${block.id}, name: ${block.name}, type: ${block.type}}`
  )
}

export default { onRun, onChildStateChange }