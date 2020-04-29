import { RequestDef } from "../request-def";
import { testBlockDef } from "./block-def.test";

export const testRequestDef = new RequestDef("test request def", [
  testBlockDef,
]);

describe("Request Def", () => {
  it("should have a name", () => {
    expect(testRequestDef.name).toBe("test request def");
  });

  it("should contain block defs", () => {
    expect(testRequestDef.blockDefs.length).toBe(1);
  });
});
