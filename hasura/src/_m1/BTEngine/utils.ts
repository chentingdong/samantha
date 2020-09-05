import { BlockState, Block } from "./interfaces"
import { updateBlockByPk } from "../../graphql/m1/mutations/updateBlockByPk"

export const updateBlockState = async (block: Block, state: BlockState) => {
  const { id, name, type, state: oldState } = block
  console.debug(
    `updatting {id: ${id}, name: ${name}, type: ${type}} from ${oldState} state to ${state} state`
  )
  const result = await updateBlockByPk({ id: block.id, data: { state } })
}
