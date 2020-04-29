import { blockCatalog } from "../block-catalog";
import { testBlockDef } from "./block-def.test";

describe("Block Catalog", () => {
  it("can add block defs", () => {
    blockCatalog.add(testBlockDef);
  });

  it("should contain block defs", () => {
    expect(blockCatalog.blockDefinitions.size).toBeGreaterThanOrEqual(0);
  });

  it("can find block defs by name", () => {
    expect(blockCatalog.find(testBlockDef.name)).toBe(testBlockDef);
  });
});
