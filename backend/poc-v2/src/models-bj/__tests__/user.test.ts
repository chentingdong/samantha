import { User } from "../user";

describe("User", () => {
  const user = new User("Dolores");

  it("should have an id", () => {
    expect(user.id).toBeDefined();
  });

  it("should have name", () => {
    expect(user.name).toBe("Dolores");
  });
});
