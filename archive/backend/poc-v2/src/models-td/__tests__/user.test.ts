import { User } from "../user";
import { Context } from "../context";

describe("User", () => {
  const context = Context.getInstance();

  it("get user info from cognito", async () => {
    const username = "Google_115419186368884878540";
    await User.getUserPoolUser(username);
    console.log(context.user);
    expect(context.user).toHaveProperty("attributes");
  });

  it("list users with attributes", async () => {
    await User.listUserPoolUsers();
    console.log(context.users?.slice(1, 3));
    expect(context.users).toHaveLength;
  });
});
