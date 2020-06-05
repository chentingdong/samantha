import { Block } from "../block";

describe("Block", () => {
  it("should return the name of the block", () => {
    const block = new Block(
      "intake form",
      "provide user to fill in one or multiple url to forms"
    );
    expect(block.name).toBe("intake form");
  });
});
