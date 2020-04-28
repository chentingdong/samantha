import { Context } from "../context";
import userData from "../data/user.json";
import { User } from "../user";

describe("Context", () => {
  const context = Context.getInstance();

  it("can change authentication status", () => {
    context.set("isAuthenticated", false);
    expect(context.isAuthenticated).toEqual(false);
  });

  it("login will update context isAuthenticated value", () => {
    User.login();
    expect(context.isAuthenticated).toEqual(true);
  });

  it("can hold user information", () => {
    context.set("user", userData);
    expect(context.user).toHaveLength;
  });
});
