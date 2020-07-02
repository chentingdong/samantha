import { Bell } from "../src/models/interface"
import { nanoid } from "nanoid"

// used by cache.tsx and setUiState.tsx

const initialBell: Bell = {
  id: nanoid(),
  name: "",
  description: "",
  state: "Created",
  context: {},
  created_at: new Date(),
  last_updated: new Date(),
  started_at: new Date(),
  root_block_id: "",
  block: {},
}
export { initialBell }
