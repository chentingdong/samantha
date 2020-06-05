import { Catalog } from "../catalog";
import { Block } from "../block";
import { Request } from "../request";

describe("Block Catalog", () => {
  let block: Block;
  let blockCatalog: Catalog<Block>;

  beforeEach(() => {
    block = new Block("test block");
    blockCatalog = new Catalog<Block>();
  });

  it("can add block", () => {
    expect(blockCatalog.items.size).toEqual(0);
    blockCatalog.add(block.name, block);
    expect(blockCatalog.items.size).toEqual(1);
  });

  it("can find block defs by name", () => {
    expect(blockCatalog.find(block.name)).toBeUndefined();
    blockCatalog.add(block.name, block);
    expect(blockCatalog.find(block.name)).toBe(block);
  });
});

describe("Request Catalog", () => {
  let request: Request;
  let requestCatalog: Catalog<Request>;

  beforeEach(() => {
    request = new Request("test request");
    requestCatalog = new Catalog<Request>();
  });

  it("should contain request defs", () => {
    expect(requestCatalog.items.size).toEqual(0);
    requestCatalog.add(request.name, request);
    expect(requestCatalog.items.size).toEqual(1);
  });

  it("can find request defs by name", () => {
    expect(requestCatalog.find(request.name)).toBeUndefined();
    requestCatalog.add(request.name, request);
    expect(requestCatalog.find(request.name)).toBe(request);
  });
});
