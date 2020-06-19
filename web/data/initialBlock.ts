import { BlockOrDef } from "../src/models/interface"
import { nanoid } from "nanoid"

const initialBlock: BlockOrDef = {
  id: nanoid(),
  name: "",
  description: "",
  type: "ParallelAll",
  state: "Draft",
  parent: null,
  children: [],
  requestors: [],
  responders: [],
  created_at: new Date(),
  last_updated: new Date(),
}
export { initialBlock }
