import { Block } from "models/interface"

const usersToString = (block: Block) => {
  return block.requestors?.map((user) => "@" + user.user.name).join(", ")
}

export interface User {
  id: string
  name: string
  email: string
  given_name?: string
  family_name?: string
  picture?: string
}

const userInitials = (user: User) => {
  console.log(user)
  let initials = "N/A"
  if (user.given_name && user.family_name)
    initials =
      user.given_name.substring(0, 1) + user.family_name.substring(0, 1)
  else if (user.given_name) initials = user.given_name.substring(0, 2)
  else if (user.family_name) initials = user.family_name.substring(0, 2)
  return initials
}

export { usersToString, userInitials }
