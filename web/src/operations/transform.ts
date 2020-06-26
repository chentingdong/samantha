import { MutationType, Typename } from "../models/enum"
import cloneDeep from "lodash/cloneDeep"

const _transformBlockInput = (block) => {
  if (!Object.isExtensible(block)) block = { ...block }

  const childrenForCreate = []
  for (const child of block.children) {
    const transformedChild = _clearnBlockInput(
      _transformBlockInput(child.child),
      false
    )
    childrenForCreate.push({ child: { data: transformedChild } })
  }

  if (childrenForCreate.length > 0) {
    block.children = { data: childrenForCreate }
  } else {
    delete block.children
  }

  if (block.requestors?.length > 0) {
    block.requestors = {
      data:
        block.requestors?.map((user) => ({
          user_id: user.user.id,
        })) || [],
    }
  }

  if (block.responders?.length > 0) {
    block.responders = {
      data:
        block.responders?.map((user) => ({
          user_id: user.user.id,
        })) || [],
    }
  }
  return block
}

const _clearnBlockInput = (block, recursive = false) => {
  if (block.__typename === Typename.blockDefs) {
    delete block.context
  }
  delete block.__mutation_type__
  delete block.__typename
  delete block.blockType
  delete block.parents

  if (block.requestors?.length === 0) delete block.requestors
  if (block.responders?.length === 0) delete block.responders

  if (recursive) block.children?.data?.map((child) => _clearnBlockInput(child))
  return block
}

const transformBlockInput = (block) => {
  return _clearnBlockInput(_transformBlockInput(block), true)
}

export { transformBlockInput }
