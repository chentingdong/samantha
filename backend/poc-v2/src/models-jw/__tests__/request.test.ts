import { Request, State } from "../request";
import { Block } from "../block";
import reqeustCatalog from "../data/requestCatalog.json";
import blockTestData from "../data/blockTestData.json";
import { User } from "../user";
import { v4 as uuid } from "uuid";

describe("Request", () => {
  const currentUser = new User(uuid(), "Jin", "jwang@bellhop.io");

  it("should be able to get a pre-defiend request from catalog", () => {
    const requestDefinitions = Request.getRequestCatalog([""]);
    expect(requestDefinitions.length).toBeGreaterThan(0);
  });

  it("should be able to get a pre-defiend request from catalog by id", () => {
    const requestDefById = Request.getRequestDefById(reqeustCatalog[1].id);
    expect(requestDefById).toMatchObject(reqeustCatalog[1]);
  });

  it("should be able to get a pre-defiend empty request from catalog as default", () => {
    const requestDefDefault = Request.getRequestDefById();
    expect(requestDefDefault).toMatchObject(reqeustCatalog[0]);
  });

  const newRequest = new Request(
    "test empty",
    "no block but as default",
    Request.getRequestDefById()
  );

  it("should be able to create an empty(no blocs) request as default", () => {
    expect(newRequest.originalRequestDef).toMatchObject(reqeustCatalog[0]); // matching originalRequestDef
    expect(newRequest.blocks.length).toBe(0); // has no blocks
  });

  it("should be able to set current user as default requester", () => {
    newRequest.setRequestor(currentUser);
    expect(newRequest.requestor).toMatchObject(currentUser);
  });

  // TODO: db search for request made by currentUser, not implemented yet.
  it("should be able in the list of 'made request' for requester", () => {
    const makeRequest = Request.getRequestMade(currentUser);
    expect(makeRequest).toBeDefined;
  });

  it("should be in pending state by default", () => {
    expect(newRequest.state).toBe("pending");
  });

  it("should be able to add block from blockLibrary", () => {
    const testBlockDef = Block.getBlockById("LEAF", blockTestData.testBlockId);
    const testBlock = new Block(uuid(), "Timesheet #22", testBlockDef); // block has no config in this test case. config covered in timesheet for specific config required
    newRequest.addBlockDef(testBlockDef);
    newRequest.addBlock(testBlock);
    expect(newRequest.blockDefs[0]).toMatchObject(testBlockDef);
    expect(newRequest.blocks[0]).toMatchObject(testBlock);
  });

  it("should be able to add responders", () => {
    const userBaiji = new User(uuid(), "Baiji", "bhe@bellhop.io");
    newRequest.addResponder(userBaiji);
    expect(newRequest.responders[0]).toMatchObject(userBaiji);
  });

  it("should be in active state when start, blocks without dependency staet should be active", () => {
    newRequest.start();
    expect(newRequest.state).toBe("active");
    expect(newRequest.blocks[0].state).toBe(State.ACTIVE);
  });

  // TODO: dependency check
  it("should be able to become active request for requestoer and responders", () => {});

  // TODO: notification module
  it("should send notification to responder", () => {});

  // TODO: db search for request made by currentUser, not implemented yet.
  it("should give a list of 'request received' for responder", () => {
    const requestReceived = Request.getRequestReceived(currentUser);
    expect(requestReceived).toBeDefined;
  });
  it("should be able to give responders responder UI", () => {});

  it("should be able to let responders to complete request", () => {
    // two scenarios? all block complete auto complete reqeust? manual send .complete()?
    newRequest.blocks.map((b: Block) => {
      b.complete();
    });
    newRequest.checkState(); // TODO: engien should set this complete
    newRequest.complete();
    expect(newRequest.state).toBe(State.COMPLETE);
  });
});
