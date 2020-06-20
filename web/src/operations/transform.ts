import { MutationType, Typename } from "../models/enum"
import cloneDeep from "lodash/cloneDeep"

const _transformBlockInput = (block) => {
  if (!Object.isExtensible(block)) block = { ...block }
  delete block.parent

  const childrenForCreate = []
  for (const child of block.children) {
    const transformedChild = _transformBlockInput(child)
    childrenForCreate.push(transformedChild)
  }

  if (childrenForCreate.length > 0) {
    block.children = {}
    block.children.data = childrenForCreate
  } else {
    delete block.children
  }

  if (block.block_requestors?.length > 0) {
    block.block_requestors = {
      data:
        block.block_requestors?.map((user) => ({
          user_id: user.user.id,
        })) || [],
    }
  }
  delete block.requestors

  if (block.block_responders?.length > 0) {
    block.block_responders = {
      data:
        block.block_responders?.map((user) => ({
          user_id: user.user.id,
        })) || [],
    }
  }
  delete block.responders
  return block
}

const _clearnBlockInput = (block) => {
  if (block.__typename === Typename.blockDefs) {
    delete block.state
    delete block.requestors
    delete block.responders
  }
  delete block.__mutation_type__
  delete block.__typename
  if (block.block_requestors?.length === 0) delete block.block_requestors
  if (block.block_responders?.length === 0) delete block.block_responders

  block.children?.create?.map((child) => _clearnBlockInput(child))
  return block
}

const transformBlockInput = (block) => {
  return _clearnBlockInput(_transformBlockInput(block))
}

export { transformBlockInput }
