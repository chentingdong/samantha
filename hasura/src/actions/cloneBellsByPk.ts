import { Request, Response } from "express"
import {
  clone_m2_bells_pk_columns_output,
  clone_m2_bells_by_pk_args,
} from "../types"
import {
  getBellByPk,
  getBlockByPk,
  insertBell,
  insertBlock,
  insertTask,
  insertGoal,
  insertBellExecutor,
  insertBellhopBellParticipation,
  insertUserBellParticipation,
  insertUserBlockParticipation,
  updateBellById,
  updateBellExecutorByPk,
} from "./graphql"
import { nanoid } from "nanoid"
import { Field } from "../types"
import { updateBlockByPk } from "../graphql/mutations/updateBlockByPk"

function clearResponses(fields: Field[]) {
  return fields.map((field) => ({ ...field, response: null }))
}

async function cloneBlock(
  id: string,
  parent_id: string,
  bell_id: string,
  is_definition: boolean,
  start_on_create: boolean = false
): Promise<string> {
  // query old block by id
  const {
    local_id,
    name,
    type,
    configs,
    sibling_order,
    user_participations,
    goal,
    task,
    bell_executor,
    children,
  } = await getBlockByPk(id)

  // generate new id
  const block_id = nanoid()
  const state = "Created"
  // set new parent_id
  // set new bell_id
  // copy local_id
  // copy other non-relationship fields
  const result = await insertBlock({
    data: {
      id: block_id,
      local_id,
      name,
      type,
      state,
      configs,
      sibling_order,
      is_definition,
      parent_id,
      bell_id,
    },
  })

  // if type == goal/task/bell_executor, clone the sub type
  switch (type) {
    case "Goal":
      //   if type == goal, clear user responses
      if (goal === null) {
        console.warn("Data Warning: goal", id, "is null")
      } else {
        await insertGoal({
          data: { id: block_id, type, goal_name: goal.goal_name },
        })
      }
      break

    case "Task":
      //   if type == task, clear user responses
      if (task === null) {
        console.warn("Data Warning: task", id, "is null")
      } else {
        await insertTask({
          data: {
            id: block_id,
            type,
            title: task.title,
            fields: clearResponses(task.fields),
          },
        })
      }
      break

    case "BellExecutor":
      //   if type == bell_executor, clear bell_id
      if (bell_executor === null) {
        console.warn("Data Warning: bell_executor", id, "is null")
      } else {
        await insertBellExecutor({
          data: { id: block_id, type, bell_id: null },
        })
      }
      break

    default:
      break
  }

  // clone user participations
  for (const user_participation of user_participations) {
    await insertUserBlockParticipation({
      data: {
        block_id,
        user_id: user_participation.user_id,
        role: user_participation.role,
      },
    })
  }

  // recursively clone all children blocks
  for (const child of children) {
    await cloneBlock(child.id, block_id, bell_id, is_definition)
  }

  if (start_on_create) {
    updateBlockByPk({ id: block_id, data: { state: "Running" } })
  }
  return block_id
}

async function cloneBell(
  id: string,
  is_definition: boolean,
  main_bell_id: string = null,
  start_on_create: boolean = false
): Promise<string> {
  // query old bell by id

  const {
    name,
    description,
    root_block_id,
    sub_bells,
    user_participations,
    bellhop_participations,
    blocks,
    acts_as_main_bell,
  } = await getBellByPk(id)

  // generate new id
  const bell_id = nanoid()
  const state = start_on_create ? "Running" : "Created"
  // clear context
  const context = {}

  // copy non-relationship fields
  const newBell = await insertBell({
    data: {
      id: bell_id,
      name,
      description,
      state,
      is_definition,
      main_bell_id,
      acts_as_main_bell,
      context,
    },
  })

  // clone bellhop participations
  for (const bellhop_participation of bellhop_participations) {
    await insertBellhopBellParticipation({
      data: {
        bell_id,
        bellhop_id: bellhop_participation.bellhop_id,
        role: bellhop_participation.role,
      },
    })
  }

  // clone user participations
  for (const user_participation of user_participations) {
    await insertUserBellParticipation({
      data: {
        bell_id,
        user_id: user_participation.user_id,
        role: user_participation.role,
      },
    })
  }

  // recursively clone block tree
  const new_root_block_id = await cloneBlock(
    root_block_id,
    null,
    bell_id,
    is_definition,
    start_on_create
  )

  await updateBellById({
    data: { root_block_id: new_root_block_id },
    id: bell_id,
  })

  // big logic to update bell_id of new bell executors
  // the mapping from old bell_id to bell executor local id
  const oldBellIdToBellExecutorLocalId = new Map()
  const oldBellExecutors = blocks.filter(
    (block) => block.type === "BellExecutor"
  )
  for (const block of oldBellExecutors) {
    oldBellIdToBellExecutorLocalId.set(
      block.bell_executor.bell_id,
      block.local_id
    )
  }

  // get new bell executors
  const { blocks: newBlocks } = await getBellByPk(bell_id)
  const newBellExecutors = newBlocks.filter(
    (block) => block.type === "BellExecutor"
  )
  // the mapping from bell executor local id to new id
  const bellExecutorLocalIdToId = new Map()
  for (const block of newBellExecutors) {
    bellExecutorLocalIdToId.set(block.local_id, block.id)
  }

  // recursively clone sub bells
  for (const subBell of sub_bells) {
    const newSubBellId = await cloneBell(subBell.id, is_definition, bell_id)

    const bellExecutorLocalId = oldBellIdToBellExecutorLocalId.get(subBell.id)

    const newBellExecutorId = bellExecutorLocalIdToId.get(bellExecutorLocalId)

    // connect new bell executors and sub bells
    await updateBellExecutorByPk({
      id: newBellExecutorId,
      data: { bell_id: newSubBellId },
    })
  }

  return bell_id
}

async function cloneM2BellsByPk(
  args: clone_m2_bells_by_pk_args
): Promise<clone_m2_bells_pk_columns_output> {
  const main_bell_id: string = null
  const start_on_create: boolean = true

  const bell_id = await cloneBell(
    args.pk_columns.id,
    args.is_definition,
    main_bell_id,
    start_on_create
  )

  return { new_id: bell_id }
}

// Request Handler
const cloneM2BellsByPkHandler = async (req: Request, res: Response) => {
  try {
    const params: clone_m2_bells_by_pk_args = req.body.input
    console.log("cloneM2BellsByPkHandler getting requests", params)
    const result = await cloneM2BellsByPk(params)
    console.log("cloneM2BellsByPk result", result)
    // success
    return res.json(result)
  } catch (e) {
    console.error(e.stack)
    return res.status(400).json({ message: e.message })
  }
}

export default cloneM2BellsByPkHandler
