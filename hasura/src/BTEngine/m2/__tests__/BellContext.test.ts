import bell from "./Bell.mock"
import { createBellContextFacts } from "../BellContext"

describe("Bell Context", () => {
  it("should create Bell Context", () => {
    const bellContext = createBellContextFacts(bell)
    console.log(bellContext.context)
    expect(
      bellContext.context.task["8o_yyJjEDKmhsRA1gIlv7"].fields
    ).toBeDefined()
  })
})
