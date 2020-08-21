import {
  Blocks,
  Tasks,
  APIExecutors,
  BellExecutors,
  BellWithContext,
  BellContextFacts,
  Block,
} from "../../types"

export const createBellContextFacts = (
  bell: BellWithContext,
  thisBlock: Block
): BellContextFacts => {
  const { parent_id, sibling_order } = thisBlock

  // TODO: don't generate sibling references if parent is Parallel
  const siblings = bell.blocks
    .filter(
      (block) =>
        block.parent_id === parent_id &&
        block.sibling_order !== null &&
        thisBlock.sibling_order !== null &&
        block.sibling_order !== thisBlock.sibling_order
    )
    .map((block) => ({
      local_id: block.local_id,
      type: block.type,
      sibling_order: block.sibling_order,
      is_prev: block.sibling_order < thisBlock.sibling_order,
      is_next: block.sibling_order > thisBlock.sibling_order,
    }))
    .sort((a, b) => a.sibling_order - b.sibling_order)

  const blocks = bell.blocks.reduce((blocks: Blocks, block) => {
    const { id, local_id, state, started_at, ended_at } = block
    const tmp_block = { id, local_id, state, started_at, ended_at }
    blocks[block.local_id] = tmp_block

    const prevBlocks = siblings.filter((block) => block.is_prev)
    if (
      prevBlocks.length > 0 &&
      block.local_id === prevBlocks[prevBlocks.length - 1].local_id
    ) {
      blocks["prev"] = tmp_block
    }

    const nextBlocks = siblings.filter((block) => block.is_next)
    if (nextBlocks.length > 0 && block.local_id === nextBlocks[0].local_id) {
      blocks["next"] = tmp_block
    }

    return blocks
  }, {})

  const tasks = bell.blocks
    .filter((block) => block.type === "Task")
    .reduce((tasks: Tasks, block) => {
      const tmp_task = {
        id: block.id,
        local_id: block.local_id,
        fields: block.task.fields,
      }

      tasks[block.local_id] = tmp_task

      const prevTasks = siblings.filter(
        (block) => block.is_prev && block.type === "Task"
      )
      if (
        prevTasks.length > 0 &&
        block.local_id === prevTasks[prevTasks.length - 1].local_id
      ) {
        tasks["prev"] = tmp_task
      }

      const nextTasks = siblings.filter(
        (block) => block.is_next && block.type === "Task"
      )
      if (nextTasks.length > 0 && block.local_id === nextTasks[0].local_id) {
        tasks["next"] = tmp_task
      }

      return tasks
    }, {})

  const bellExecutors = bell.blocks
    .filter((block) => block.type === "BellExecutor")
    .reduce((bellExecutors: BellExecutors, block) => {
      const tmp_bellExecutor = {
        id: block.id,
        local_id: block.local_id,
        context: block.bell_executor.context,
      }
      bellExecutors[block.local_id] = tmp_bellExecutor

      const prevBellExecutors = siblings.filter(
        (block) => block.is_prev && block.type === "BellExecutor"
      )
      if (
        prevBellExecutors.length > 0 &&
        block.local_id ===
          prevBellExecutors[prevBellExecutors.length - 1].local_id
      ) {
        bellExecutors["prev"] = tmp_bellExecutor
      }

      const nextBellExecutors = siblings.filter(
        (block) => block.is_next && block.type === "BellExecutor"
      )
      if (
        nextBellExecutors.length > 0 &&
        block.local_id === nextBellExecutors[0].local_id
      ) {
        bellExecutors["next"] = tmp_bellExecutor
      }

      return bellExecutors
    }, {})

  const result: BellContextFacts = {
    context: {
      block: blocks,
      task: tasks,
      bell_executor: bellExecutors,
      bell: {
        context: bell.context,
        started_at: bell.started_at,
        ended_at: bell.ended_at,
        users: bell.users || [],
        bellhops: bell.bellhops || [],
      },
      users: thisBlock.user_participations || [],
    },
  }

  // console.log(JSON.stringify(result, null, 2))

  return result
}
