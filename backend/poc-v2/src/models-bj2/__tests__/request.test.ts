import { Request } from "../request";
import { User } from "../user";
import { Block } from "../block";

describe("Request", () => {
  let request: Request;
  const user1 = new User("Dolores");
  const user2 = new User("Caleb");
  const user3 = new User("Maeve");
  const block = new Block("test block");

  beforeEach(() => {
    request = new Request("test request");
    request.addRequestor(user1);
    request.addResponder(user2);
    request.addBlock(block);
  });

  it("should return request surface for requestor", () => {
    expect(request.getSurface(user1)).not.toHaveProperty("blocks");
  });

  it("should return response surface for responder", () => {
    const surface = request.getSurface(user2);
    expect(surface).toHaveProperty("blocks");
    console.log(surface);
  });

  it("should return null for non user", () => {
    expect(request.getSurface(user3)).toBeFalsy();
  });
});
