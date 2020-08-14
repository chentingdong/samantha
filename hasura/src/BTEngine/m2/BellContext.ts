import { Tasks, BellWithContext, BellContextFacts } from "../../types"

export const createBellContextFacts = (
  bell: BellWithContext
): BellContextFacts => {
  const tasks = bell.blocks
    .filter((block) => block.type === "Task")
    .reduce((tasks: Tasks, block) => {
      tasks[block.local_id] = { fields: block.task.fields }
      return tasks
    }, {})
  const result: BellContextFacts = { context: { task: tasks } }

  // for (const block of bell.blocks) {
  //   if (block.type === "Task") {
  //     const local_id = block.local_id
  //     const fields = block.task.fields
  //     result.context.task[local_id] = { fields }
  //   }
  // }
  return result
}
