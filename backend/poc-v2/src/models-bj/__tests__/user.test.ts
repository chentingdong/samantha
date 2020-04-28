import { User } from "../user";

export const user1 = new User("Dolores");
export const user2 = new User("Caleb");

describe("User", () => {
  it("should have an id", () => {
    expect(user1.id).toBeDefined();
  });

  it("should have name", () => {
    expect(user1.name).toBe("Dolores");
  });
});
