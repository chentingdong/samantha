import { Request, State } from "../request";
import { Block } from "../block";
import { BlockDef } from "../block-def";
import { BlockLib } from "../block-lib";
import { user1, user2 } from "./user.test";

describe("Request", () => {
  let request = new Request("test title");

  it("should have a title", () => {
    expect(request.title).toBe("test title");
  });

  it("can have a requestor", () => {
    request.setRequestor(user1);
    expect(request.requestor).toBe(user1);
  });

  it("can have responders", () => {
    request.addResponder(user2);
    expect(request.reqsponders.indexOf(user2)).toBeGreaterThanOrEqual(0);
  });

  it("should be in active state after creation", () => {
    expect(request.state).toBe(State.ACTIVE);
  });

  it.todo("can manual complete");

  it.todo("can have blocks");

  it.todo("can return pending blocks");

  it.todo("can return active blocks");

  it.todo("can return requestor view");

  it.todo("can return responder view");
});
