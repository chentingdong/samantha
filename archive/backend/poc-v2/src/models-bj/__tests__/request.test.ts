import { Request, State } from "../request";
import { Block } from "../block";
import { TestBlockDef } from "./block-def.test";
import { User } from "../user";

describe("Request", () => {
  const request = new Request("test title");
  const testBlockDef = new TestBlockDef("test block def");
  const testBlock = new Block(testBlockDef);
  const user1 = new User("Dolores");
  const user2 = new User("Caleb");

  it("should have a title", () => {
    expect(request.title).toBe("test title");
  });

  it("can have a requestor", () => {
    request.setRequestor(user1);
    expect(request.requestor).toBe(user1);
  });

  it("can have responders", () => {
    request.addResponder(user2);
    expect(request.responders.indexOf(user2)).toBeGreaterThanOrEqual(0);
  });

  it("should be in active state after creation", () => {
    expect(request.state).toBe(State.ACTIVE);
  });

  it("can have blocks", () => {
    request.addBlock(testBlock);
    expect(request.blocks.length).toBe(1);
  });

  it("can return pending blocks", () => {
    const pendingBlocks = request.listPendingBlocks();
    expect(pendingBlocks.length).toBe(1);
    expect(pendingBlocks[0]).toBe(testBlock);
  });

  it("can return active blocks", () => {
    const activeBlocks = request.listActiveBlocks();
    expect(activeBlocks.length).toBe(0);
  });

  it.todo("can return request surface");

  it.todo("can return response surface");

  it("can manual complete", () => {
    request.complete();
    expect(request.state).toBe(State.COMPLETE);
  });
});
