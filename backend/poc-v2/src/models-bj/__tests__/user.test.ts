import { User } from "../user";

describe("User", () => {
  const user1 = new User("Dolores");

  it("should have an id", () => {
    expect(user1.id).toBeDefined();
  });

  it("should have name", () => {
    expect(user1.name).toBe("Dolores");
  });
});
