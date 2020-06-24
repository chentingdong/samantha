import { Block } from "./interfaces"

export default async (block: Block) => {
  console.log("retry logic on ", JSON.stringify(block, null, 2))
}
