import { BlockOrDef } from "../src/models/interface"
import uuid from "uuid"

const initialBlock: BlockOrDef = {
  id: uuid.v4(),
  name: "",
  description: "",
  type: "COMPOSITE_PARALLEL",
  state: "DRAFT",
  parent: null,
  children: [],
  requestors: [],
  responders: [],
  action: "",
  created_at: new Date(),
  last_updated: new Date(),
}
export { initialBlock }
