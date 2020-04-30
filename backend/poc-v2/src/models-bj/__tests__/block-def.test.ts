import { BlockDef } from "../block-def";

export class TestBlockDef extends BlockDef {
  execute(): void {
    console.log(this.name);
  }
}

export const testBlockDef = new TestBlockDef("test block def");

describe("Block Def", () => {
  it("should have a name", () => {
    expect(testBlockDef.name).toBe("test block def");
  });

  it("should have an execute function", () => {
    expect(testBlockDef.execute).toBeDefined();
  });
});
