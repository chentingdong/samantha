import { platform } from "../platform";
import { Request } from "../request";
import { Block } from "../block";
import { testBlockDef } from "./block-def.test";
import { user1, user2 } from "./user.test";

describe("Platform", () => {
  const testBlock = new Block(testBlockDef);
  const request = new Request("test title");

  beforeAll(() => {
    request.setRequestor(user1);
    request.addResponder(user2);
    request.addBlock(testBlock);
    platform.addRequest(request);
    testBlock.start();
  });

  it("can contain requests", () => {
    expect(platform.requests.length).toBe(1);
  });

  it("can find requests by requestor", () => {
    expect(platform.listRequestsByRequestor(user1)).toEqual([request]);
    expect(platform.listRequestsByRequestor(user2)).toEqual([]);
  });

  it("can find requests by responder", () => {
    expect(platform.listRequestsByResponder(user1)).toEqual([]);
    expect(platform.listRequestsByResponder(user2)).toEqual([request]);
  });

  it("can find active blocks by responder", () => {
    const activeBlocks = platform.listActiveBlocksByResponder(user2);
    expect(activeBlocks).toEqual([testBlock]);
  });
});
