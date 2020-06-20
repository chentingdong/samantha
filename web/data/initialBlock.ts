import { BlockOrDef } from "../src/models/interface"
import { nanoid } from "nanoid"

// used by cache.tsx and setUiState.tsx

const initialBlock: BlockOrDef = {
  id: nanoid(),
  name: "",
  description: "",
  type: "ParallelAll",
  state: "Draft",
  control: {},
  context: {},
  props: {},
  root: null,
  parent: null,
  children: [],
  block_requestors: [],
  block_responders: [],
  created_at: new Date(),
  last_updated: new Date(),
}
export { initialBlock }
