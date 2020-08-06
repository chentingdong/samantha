import { listTree23Level } from "../../src/utils/bell"

describe("listTree2Level", () => {
  let testCase, expected

  it("should sort to flattened tree output", () => {
    testCase = [
      { id: "a", parent_id: null },
      { id: "b", parent_id: "a" },
      { id: "c", parent_id: "a" },
      { id: "d", parent_id: "b" },
      { id: "e", parent_id: "b" },
      { id: "f", parent_id: "c" },
      { id: "g", parent_id: "c" },
      { id: "h", parent_id: "g" },
    ]
    expected = [
      { id: "a", parent_id: null, className: "generation-1" },
      { id: "b", parent_id: "a", className: "generation-2" },
      { id: "d", parent_id: "b", className: "generation-3" },
      { id: "e", parent_id: "b", className: "generation-3" },
      { id: "c", parent_id: "a", className: "generation-2" },
      { id: "f", parent_id: "c", className: "generation-3" },
      { id: "g", parent_id: "c", className: "generation-3" },
      { id: "h", parent_id: "g", className: "generation-4" },
    ]
    const result = listTree23Level(testCase)
    console.log(result)
    expect(result).toEqual(expected)
  })
})
