import { Request, STATE } from "../request";
import { Block } from "../block";

describe("Request", () => {
  const request = new Request("1", "a", "test");

  it("should return the name of the request", () => {
    expect(request.name).toBe("a");
  });

  it("should be in pending state by default", () => {
    expect(request.state).toBe(STATE.PENDING);
  });

  it("should be able to contain blocks", () => {
    const block1 = new Block("1", "x", "test");
    const block2 = new Block("2", "y", "test");
    request.blocks = [block1, block2];
    expect(request.blocks.length).toBe(2);
  });

  it("should be able to add new block", () => {
    const block1 = new Block("1", "x", "test");
    request.blocks.push(block1);
    expect(request.blocks[0]).toEqual(block1);
    expect(request.name).toBe("a");
  });
});

describe("NDA Form", () => {});
