import { Block, BlockState } from "./interfaces"
import { updateBlockState } from "./utils"
import invariant from "invariant"
import { JSONPath } from "jsonpath-plus"

export const preCondition = async (block: Block) => {
  const decorators = block.control.decorators
  if (decorators) {
    const { fact, value, operator } = decorators[0].data[0].all[0]
    if (operator !== "greaterThan") {
      console.debug("Only one rule with greaterThan is supported.")
      return
    }
    const lhs = JSONPath({
      path: fact,
      json: block.root.context,
      wrap: false,
    })

    console.log("evaluating: ", lhs, " >= ", value)

    if (!(lhs >= value)) {
      updateBlockState(block, BlockState.Success)
      return false
    }
  }
  return true
}
