import { Block } from "./interfaces"

export default async (block: Block) => {
  console.log("sequence logic on ", JSON.stringify(block, null, 2))
}
