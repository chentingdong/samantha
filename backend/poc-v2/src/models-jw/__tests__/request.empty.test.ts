import { Request, STATE } from "../request";
import { Block } from "../block";
import reqeustCatalog from "../data/requestCatalog.json";
import blockTestData from "../data/blockTestData.json";
import { User } from "../user";
import { v4 as uuid } from "uuid";

describe("Request From Empty", () => {
  const currentUser = new User(uuid(), "Jin", "jwang@bellhop.io");

  it("should be able to get a list of pre-defiend requests from catalog", () => {
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

  it("should be in pending state by default", () => {
    expect(newRequest.state).toBe("pending");
  });

  it("should be able to add block from blockLibrary and set config", () => {
    const testBlockDef = Block.getBlockById("LEAF", blockTestData.testBlockId);
    newRequest.addBlockDef(testBlockDef);
    const testBlock = new Block("Timesheet #22", testBlockDef);
    testBlock.config.formType = "external";
    testBlock.config.formLink = "https://sheet.gdrive.com/234567";
    testBlock.setConfig();
    newRequest.addBlock(testBlock);
    expect(newRequest.blockDefs[0]).toMatchObject(testBlockDef);
    expect(newRequest.blocks[0]).toMatchObject(testBlock);
    expect(newRequest.blocks[0].data.externalLink).toBe(
      "https://sheet.gdrive.com/234567"
    );
  });

  it("should be able to add responders", () => {
    const userBaiji = new User(uuid(), "Baiji", "bhe@bellhop.io");
    newRequest.addResponder(userBaiji);
    expect(newRequest.responders[0]).toMatchObject(userBaiji);
  });
});

describe("NDA Form", () => {});
