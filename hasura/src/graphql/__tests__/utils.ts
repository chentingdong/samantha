import { nanoid } from "nanoid"

export const createRandomUserInput = () => {
  const id = nanoid()
  const rand = Math.floor(Math.random() * 10)
  const name = "User " + rand
  const email = "user" + rand + "@bellhop.io"
  return { id, name, email }
}

export const createRandomBellhopInput = () => {
  const id = nanoid()
  const rand = Math.floor(Math.random() * 10)
  const name = "Bellhop " + rand
  return { id, name }
}

export const createRandomGoalDefInput = () => {
  const id = nanoid()
  const rand = Math.floor(Math.random() * 10)
  const local_id = id
  const type = "Goal"
  const state = "Draft"
  const is_definition = true
  return { block: { id, local_id, type, state, is_definition } }
}

export const createRandomTaskDefInput = () => {
  const id = nanoid()
  const rand = Math.floor(Math.random() * 10)
  const local_id = id
  const type = "Task"
  const state = "Draft"
  const is_definition = true
  const title = "Form Title " + rand
  return {
    block: { id, local_id, type, state, is_definition },
    form_task: { id, type, title },
  }
}

export const createRandomBellExecutorDefInput = (goal_id: string) => {
  const id = nanoid()
  const rand = Math.floor(Math.random() * 10)
  const local_id = id
  const type = "BellExecutor"
  const state = "Draft"
  const is_definition = true
  return {
    block: { id, local_id, type, state, is_definition },
    form_task: { id, type, goal_id },
  }
}

export const createRandomMainBellDefInput = () => {
  const id = nanoid()
  const rand = Math.floor(Math.random() * 10)
  const name = "Bell " + rand
  const state = "Draft"
  const goal_name = "Main Goal " + rand
  const is_definition = true
  const acts_as_main_bell = true
  return { id, name, state, goal_name, acts_as_main_bell, is_definition }
}

export const createRandomSecondaryBellDefInput = (main_bell_id: string) => {
  const id = nanoid()
  const rand = Math.floor(Math.random() * 10)
  const name = "Bell " + rand
  const state = "Draft"
  const goal_name = "Secondary Goal " + rand
  const is_definition = true
  const acts_as_main_bell = false
  return {
    id,
    name,
    state,
    goal_name,
    acts_as_main_bell,
    main_bell_id,
    is_definition,
  }
}
