import bell from "./Bell.mock"
import block from "./Block.mock"
import task from "./Task.mock"
import { createBellContextFacts } from "../BellContext"

describe("Bell Context", () => {
  it("should create Bell Context", () => {
    const bellContext = createBellContextFacts(bell, task)
    const local_id = "Fw2rwZaa27CIyilQKNqge"
    const prev_task_local_id = "cO64qn3wioY6O7h_LOi-L"
    const prev_block_local_id = "sTOp8e44a9NdJweWr828_"
    const next_task_local_id = "vuJeHylhqX0YbTVtgDsZ7"
    const next_block_local_id = "vuJeHylhqX0YbTVtgDsZ7"
    // console.log(block.id, bellContext)
    expect(task.local_id).toEqual(local_id)
    expect(bellContext.context.task[local_id].fields).toBeDefined()
    expect(bellContext.context.task.prev.fields).toBeDefined()
    expect(bellContext.context.block.prev.local_id).toEqual(prev_block_local_id)
    expect(bellContext.context.task.prev.local_id).toEqual(prev_task_local_id)
    expect(bellContext.context.task.next.fields).toBeDefined()
    expect(bellContext.context.block.next.local_id).toEqual(next_block_local_id)
    expect(bellContext.context.task.next.local_id).toEqual(next_task_local_id)

    expect(bellContext.context.bell.context).toBeDefined()

    expect(bellContext.context.users).toBeDefined()
  })
})
