import { BlockOrDef } from "../src/models/interface"
import { nanoid } from "nanoid"

// used by cache.tsx and setUiState.tsx

const initialBlock: BlockOrDef = {
  id: nanoid(),
  name: "",
  description: "",
  type: "ParallelAll",
  control: {},
  state: "Created",
  props: {},
  root: null,
  parents: [],
  children: [],
  requestors: [],
  responders: [],
  created_at: new Date(),
  last_updated: new Date(),
}

export { initialBlock }
