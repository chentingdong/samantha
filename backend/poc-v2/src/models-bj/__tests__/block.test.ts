import { Block } from "../block";

describe("Block", () => {
  it("should return the name of the block", () => {
    const block = new Block("1", "a", "test");
    expect(block.name).toBe("a");
  });
});
