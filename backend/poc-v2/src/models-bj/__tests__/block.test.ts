import { Block, State } from "../block";
import { testBlockDef } from "./block-def.test";

describe("Block", () => {
  const testBlock = new Block(testBlockDef);

  it("should have an id", () => {
    expect(testBlock.id).toBeDefined();
  });

  it("should have a definition", () => {
    expect(testBlock.definition).toBe(testBlockDef);
  });

  it("should have a state", () => {
    expect(testBlock.state).toBeDefined();
  });

  it("should be in pending state after creation", () => {
    expect(testBlock.state).toBe(State.PENDING);
  });

  it("can manual start", () => {
    const result = testBlock.start();
    if (result) expect(testBlock.state).toBe(State.ACTIVE);
  });

  it("can manual complete", () => {
    const result = testBlock.complete();
    if (result) expect(testBlock.state).toBe(State.COMPLETE);
  });
});

describe("Form Block", () => {});

describe("Approval Block", () => {});

describe("Dependency Block", () => {});

describe("Request Block", () => {});
