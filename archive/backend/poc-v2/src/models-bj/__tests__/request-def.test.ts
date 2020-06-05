import { RequestDef } from "../request-def";
import { TestBlockDef } from "./block-def.test";

describe("Request Def", () => {
  const testBlockDef = new TestBlockDef("test block def");
  const testRequestDef = new RequestDef("test request def", [testBlockDef]);

  it("should have a name", () => {
    expect(testRequestDef.name).toBe("test request def");
  });

  it("should contain block defs", () => {
    expect(testRequestDef.blockDefs.length).toBe(1);
  });
});
