import { Request } from "../request";

describe("Request", () => {
  it("should return the name of the request", () => {
    const request = new Request("1", "a", "test");
    expect(request.name).toBe("a");
  });
});
