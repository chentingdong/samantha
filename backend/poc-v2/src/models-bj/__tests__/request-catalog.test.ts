import { RequestCatalog } from "../request-catalog";
import { RequestDef } from "../request-def";

describe("Request Catalog", () => {
  let testRequestDef: RequestDef;
  let testRequestCatalog: RequestCatalog;

  beforeEach(() => {
    testRequestDef = new RequestDef("test request def");
    testRequestCatalog = new RequestCatalog();
  });

  afterEach(() => {
    testRequestCatalog.requestDefinitions.clear();
  });

  it("should contain request defs", () => {
    expect(testRequestCatalog.requestDefinitions.size).toBeGreaterThanOrEqual(
      0
    );
    testRequestCatalog.add(testRequestDef);
    expect(testRequestCatalog.requestDefinitions.size).toBeGreaterThanOrEqual(
      1
    );
  });

  it("can find request defs by name", () => {
    testRequestCatalog.add(testRequestDef);
    expect(testRequestCatalog.find(testRequestDef.name)).toBe(testRequestDef);
  });
});
