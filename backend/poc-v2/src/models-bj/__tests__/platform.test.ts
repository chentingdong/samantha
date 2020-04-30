import { platform } from "../platform";
import { Request } from "../request";
import { Block } from "../block";
import { TestBlockDef } from "./block-def.test";
import { User } from "../user";

describe("Platform", () => {
  const user1 = new User("Dolores");
  const user2 = new User("Caleb");
  const testBlockDef = new TestBlockDef("test block def");

  let testBlock: Block;
  let request: Request;

  beforeAll(() => {
    request = new Request("test request title");
    request.setRequestor(user1);
    request.addResponder(user2);
    testBlock = new Block(testBlockDef);
    request.addBlock(testBlock);
    platform.addRequest(request);
    testBlock.start();
  });

  it("can contain requests", () => {
    expect(platform.requests.length).toBe(1);
  });

  it("can find requests by requestor", () => {
    expect(platform.listActiveRequestsByRequestor(user1)).toEqual([request]);
    expect(platform.listActiveRequestsByRequestor(user2)).toEqual([]);
  });

  it("can find requests by responder", () => {
    expect(platform.listActiveRequestsByResponder(user1)).toEqual([]);
    expect(platform.listActiveRequestsByResponder(user2)).toEqual([request]);
  });

  it("can find active blocks by responder", () => {
    const activeBlocks = platform.listActiveBlocksByResponder(user2);
    expect(activeBlocks).toEqual([testBlock]);
  });
});
