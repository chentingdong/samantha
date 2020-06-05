import { transformBlockInput } from "./transform"
import blockInput from "./__mock__/blockInput.js"
import complexBlockCreateInput from "./__mock__/complexBlockCreate.js"
import { MutationType } from "../models/enum"

describe("Transform Block Input", () => {
  let result
  let complexResult
  beforeAll(() => {
    result = transformBlockInput(blockInput)
    complexResult = transformBlockInput(complexBlockCreateInput)
  })

  it("should connect requestors", () => {
    expect(result.requestors.connect).toBeDefined()
  })

  it("should connect responders", () => {
    expect(result.responders.connect).toBeDefined()
  })

  it("should have requestors as objects", () => {
    expect(result.requestors.connect[0]).toBeDefined()
  })
})
