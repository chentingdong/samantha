import { BlockDef } from "../block-def";

export class TestBlockDef extends BlockDef {
  execute(): void {
    console.log(this.name);
  }
}

describe("Block Def", () => {
  const testBlockDef = new TestBlockDef("test block def");

  it("should have a name", () => {
    expect(testBlockDef.name).toBe("test block def");
  });

  it("should have an execute function", () => {
    expect(testBlockDef.execute).toBeDefined();
  });
});
