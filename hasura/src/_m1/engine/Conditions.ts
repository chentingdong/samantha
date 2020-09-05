import { Block, BlockState } from "./interfaces"
import { updateBlockState } from "./utils"
import { Engine } from "json-rules-engine"
import cloneDeep from "lodash.clonedeep"

export const preCondition = async (block: Block): Promise<boolean> => {
  const decorators = block.control.decorators
  if (decorators) {
    const engine = new Engine()
    const event = {
      type: "matched",
    }
    const rules: object[] = []
    if (decorators) {
      decorators.map((decorator: any) => {
        if (decorator.template === "Conditional") {
          decorator.data.map((conditions: any) => {
            engine.addRule({ conditions, event })
            rules.push(conditions)
          })
        }
      })
    }

    const facts = cloneDeep(block.root.context)
    const { events } = await engine.run(facts)
    console.log(
      "rules: ",
      JSON.stringify(rules, null, 2),
      ", events: ",
      JSON.stringify(events, null, 2)
    )
    if (rules.length > 0 && events.length === 0) {
      updateBlockState(block, BlockState.Success)
      return false
    }
  }
  return true
}
