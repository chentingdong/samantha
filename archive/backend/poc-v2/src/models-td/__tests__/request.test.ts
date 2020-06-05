import { Request, STATE } from "../request";
import { Block } from "../block";

describe("Request", () => {
  it("should return the name of the request", () => {
    const request = new Request(
      "plan",
      "empty request that user plans on runtime"
    );
    expect(request.name).toBe("plan");
  });

  it("should be in pending state by default", () => {
    const request = new Request(
      "plan",
      "empty request that user plans on runtime"
    );
    expect(request.state).toBe(STATE.PENDING);
  });

  it("should be able to contain blocks", () => {
    const request = new Request(
      "plan",
      "empty request that user plans on runtime"
    );
    const block1 = new Block("x", "test");
    const block2 = new Block("y", "test");
    request.blocks = [block1, block2];
    expect(request.blocks.length).toBe(2);
  });
});
