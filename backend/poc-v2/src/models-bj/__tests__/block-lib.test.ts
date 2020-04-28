import { blockLib } from "../block-lib";
import { testBlockDef } from "./block-def.test";

describe("Block Lib", () => {
  it("can add block defs", () => {
    blockLib.add(testBlockDef);
  });

  it("should contain block defs", () => {
    expect(blockLib.definitions.size).toBeGreaterThanOrEqual(0);
  });

  it("can find block defs by name", () => {
    expect(blockLib.find(testBlockDef.name)).toBe(testBlockDef);
  });
});
