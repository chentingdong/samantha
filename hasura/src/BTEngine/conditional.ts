import { Block } from "./interfaces"

export default async (block: Block) => {
  console.log("conditional logic on ", JSON.stringify(block, null, 2))
}
