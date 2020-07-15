import { Block } from "models/interface"

const usersToString = (block: Block) => {
  return block.requestors?.map((user) => "@" + user.user.name).join(", ")
}

export { usersToString }
