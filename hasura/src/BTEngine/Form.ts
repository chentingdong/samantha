import { Block, BlockState } from "./interfaces"
import { updateBlockState } from "./utils"
import invariant from "invariant"
import { JSONPath } from "jsonpath-plus"
import { preCondition } from "./Conditions"

const onRun = async (block: Block) => {
  console.log(`onRun: block: ${block.id} ${block.state}`)

  preCondition(block)

  // let engine = new Engine()

  // let event = {
  //   type: "result",
  //   params: { message: "true" },
  // }
  // let rules = []
  // if (decorators) {
  //   rules = decorators.map((decorator: any) => {
  //     if (decorator.template === "Conditional") {
  //       const data = decorator.data[0]
  //       const rule = {
  //         conditions: { all: data.all.map((d: any) => ({ ...d })) },
  //         event,
  //       }
  //       engine.addRule(rule as any)
  //       return rule
  //     }
  //   })
  // }
  // console.log("rules", JSON.stringify(rules))

  // const facts = block.root.context

  // engine
  //   .run(facts)
  //   .then((results) => {
  //     console.log("rule engine results", JSON.stringify(results, null, 2))
  //   })
  //   .catch((err) => console.log(err.stack))
}

const onChildStateChange = async (block: Block, child: Block) => {
  console.log(
    `onChildStateChange: block: ${block.id} ${block.state}, child: ${child.id} ${child.state}`
  )
  invariant(
    block.state === BlockState.Running,
    "Only Running blocks care about child state change."
  )
  console.debug(
    `No action taken by parent {id: ${block.id}, name: ${block.name}, type: ${block.type}}`
  )
}

export default { onRun, onChildStateChange }
