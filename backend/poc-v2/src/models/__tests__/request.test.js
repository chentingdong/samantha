import { Request } from "../request";

describe("Request", () => {
  it("should return the name", () => {
    const request = new Request(1, "a");
    expect(request.name).toBe("a");
  });
});
