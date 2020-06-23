import { nanoid } from "nanoid"

export const createRandomUserInput = () => {
  const id = nanoid()
  const name = "User " + Math.floor(Math.random() * 10)
  const email = "user" + Math.floor(Math.random() * 10) + "@bellhop.io"
  return { id, name, email }
}
export const createRandomBlockDefInput = () => {
  const id = nanoid()
  const name = "Bell " + Math.floor(Math.random() * 10)
  const type = "Form"
  const state = "Draft"
  return { id, name, type, state }
}
export const createRandomBlockInput = () => {
  const id = nanoid()
  const name = "Bell " + Math.floor(Math.random() * 10)
  const type = "Form"
  const state = "Created"
  return { id, name, type, state }
}
