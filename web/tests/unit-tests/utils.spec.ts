import { listTree2Level } from "../../src/utils/bell"

describe("listTree2Level", () => {
  let testCase, expected
  beforeAll(() => {
    testCase = [
      { id: "a", parent_id: "c" },
      { id: "b", parent_id: "c" },
      { id: "c", parent_id: null },
    ]
    expected = [
      { id: "c", parent_id: null },
      { id: "a", parent_id: "c", className: "generation-2" },
      { id: "b", parent_id: "c", className: "generation-2" },
    ]
  })

  it("should sort to flattened tree output", () => {
    const result = listTree2Level(testCase)
    expect(result).toEqual(expected)
  })
})
