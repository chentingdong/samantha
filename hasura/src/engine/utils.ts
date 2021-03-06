import { BlockState, Block } from "../types"
import { updateBlockByPk } from "../graphql/mutations/updateBlockByPk"

export const updateBlockState = async (block: Block, state: BlockState) => {
  const { id, name, type, state: oldState } = block
  console.debug(
    `updateting {id: ${id}, name: ${name}, type: ${type}} from ${oldState} state to ${state} state`
  )
  const result = await updateBlockByPk({ id: block.id, data: { state } })
}
