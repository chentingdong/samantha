import { requestCatalog } from "../request-catalog";
import { testRequestDef } from "./request-def.test";

describe("Request Catalog", () => {
  it("can add request defs", () => {
    requestCatalog.add(testRequestDef);
  });

  it("should contain request defs", () => {
    expect(requestCatalog.requestDefinitions.size).toBeGreaterThanOrEqual(0);
  });

  it("can find request defs by name", () => {
    expect(requestCatalog.find(testRequestDef.name)).toBe(testRequestDef);
  });
});
