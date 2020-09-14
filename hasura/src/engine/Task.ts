import { Block, BlockState } from "../types"
import invariant from "invariant"
import { evalBlockPreConditions } from "./PreConditions"

const onRun = async (block: Block, preCondResult: boolean = true) => {}

const onChildStateChange = async (block: Block, child: Block) => {}

export default { onRun, onChildStateChange }
