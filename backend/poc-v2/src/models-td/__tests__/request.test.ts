import { Request, STATE } from "../request";
import { Block } from "../block";

describe("Request", () => {
  it("should return the name of the request", () => {
    const request = new Request("1", "a", "test");
    expect(request.name).toBe("a");
  });

  it("should be in pending state by default", () => {
    const request = new Request("1", "a", "test");
    expect(request.state).toBe(STATE.PENDING);
  });

  it("should be able to contain blocks", () => {
    const request = new Request("1", "a", "test");
    const block1 = new Block("1", "x", "test");
    const block2 = new Block("2", "y", "test");
    request.blocks = [block1, block2];
    expect(request.blocks.length).toBe(2);
  });
});
