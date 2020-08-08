import { Block, Bell } from "../../types"
import { updateBlockState } from "./utils"
import { Engine } from "json-rules-engine"
import { TopLevelCondition } from "json-rules-engine/types"
import { BellWithContext, BellContextFacts } from "../../types"
import { getBellWithContext } from "../../graphql/m2/queries/getBellWithContext"

export const evalConditions = async (
  conditions: TopLevelCondition,
  bellContext: object
): Promise<boolean> => {
  const engine = new Engine()
  const event = { type: "matched" }
  engine.addRule({ conditions, event })
  const { events } = await engine.run(bellContext)

  return events.length > 0
}

export const createBellContextFacts = (
  bell: BellWithContext
): BellContextFacts => {
  const result: BellContextFacts = { context: { task: {} } }
  for (const block of bell.blocks) {
    const local_id = block.local_id
    const fields = block.task.fields
    result.context.task[local_id] = { fields }
  }
  return result
}

// use in onRun event handler: block.state changed from Created to Running
export const evalBlockPreConditions = async (
  block: Block
): Promise<boolean> => {
  const conditions = block.configs.pre_conditions
  if (conditions) {
    const bell = await getBellWithContext(block.bell_id)
    const bellContextFacts = createBellContextFacts(bell)
    const result = await evalConditions(conditions, bellContextFacts)

    // if (result === true) conditions matched, safe to change block state to Running
    // if (result === false) conditions not matched, no need to run the block, change state to Success to skip it

    return result
  }
  // no conditions, safe to change block state to Running
  return true
}
