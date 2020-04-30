import { BlockCatalog } from "../block-catalog";
import { TestBlockDef } from "./block-def.test";

describe("Block Catalog", () => {
  let testBlockDef: TestBlockDef;
  let testBlockCatalog: BlockCatalog;

  beforeEach(() => {
    testBlockDef = new TestBlockDef("test block def");
    testBlockCatalog = new BlockCatalog();
    testBlockCatalog.add(testBlockDef);
  });

  afterEach(() => {
    testBlockCatalog.blockDefinitions.clear();
  });

  it("can add block defs", () => {
    expect(testBlockCatalog.blockDefinitions.size).toBeGreaterThanOrEqual(0);
    testBlockCatalog.add(testBlockDef);
    expect(testBlockCatalog.blockDefinitions.size).toBeGreaterThanOrEqual(1);
  });

  it("can find block defs by name", () => {
    testBlockCatalog.add(testBlockDef);
    expect(testBlockCatalog.find(testBlockDef.name)).toBe(testBlockDef);
  });
});
