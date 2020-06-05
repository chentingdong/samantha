import { Request, State } from "../request";
import { Block, DependencyBlock } from "../block";
import { v4 as uuid } from "uuid";
import { User } from "../user";
//import { Context } from "../context";

describe("Request Use Case - NDA Form Approval", () => {
  // covered test in request.empty.test.ts
  // create new request as default empty request, no blocks
  const newRequest = new Request(
    "test empty",
    "no block but as default",
    Request.getRequestDefById()
  );
  // add requester
  const currentUser = new User(uuid(), "Jin", "jwang@bellhop.io");
  newRequest.setRequestor(currentUser);

  // covered in reqeust.empty.test.ts,
  // adding form block to new reqeust and config to external linked NDA form
  const formBlockDef = Block.getBlockByName("LEAF", "intake-form");
  const formBlock = new Block("NDA Form", formBlockDef);
  formBlock.config.formType = "external";
  formBlock.config.formLink = "https://sheet.gdrive.com/NDA_Form/34566";
  formBlock.setConfig();
  newRequest.addBlock(formBlock);

  // add responder
  const userBaiji = new User(uuid(), "Baiji", "bhe@bellhop.io"); // TODO: use context.user
  newRequest.addResponder(userBaiji);

  const approveBlockDef = Block.getBlockByName("LEAF", "get-approval");
  const approveBlock = new Block("Approve NDA Form", approveBlockDef);
  it("should be able to add approval block and config it", () => {
    // TODO: context and user pools need to bo set
    // const context = Context.getInstance();
    // User.listUserPoolUsers();
    // console.log(context.users);
    approveBlock.config.approver = "BaiJi He";
    // these 2 config should be a copy from form block from UI
    approveBlock.config.formType = "external";
    approveBlock.config.formLink = "https://sheet.gdrive.com/NDA_Form/34566";
    approveBlock.setConfig();
    newRequest.addBlock(approveBlock);
    expect(newRequest.blocks[1].data.approver).toBe("BaiJi He");
  });

  it("should be able to add dependency on approval block waiting for intake-form", () => {
    const dependencyBlockDef = Block.getBlockByName(
      "dependencyBlocks",
      "Serial Dependency"
    );
    const dependencyBlock = new DependencyBlock(
      "Fill Form Before Approval",
      dependencyBlockDef
    );
    dependencyBlock.addFromBlock(formBlock);
    dependencyBlock.addToBlock(approveBlock);
    newRequest.addDependency(dependencyBlock);
    expect(newRequest.dependencies[0].fromBlocks[0].blockDef.name).toBe(
      "intake-form"
    );
    expect(newRequest.dependencies[0].toBlocks[0].blockDef.name).toBe(
      "get-approval"
    );
  });

  it("should be able to start 2 blocks and set state with dependency, intake-form active, approval keeps pending", () => {
    newRequest.start();
    expect(newRequest.blocks[0].state).toBe(State.ACTIVE);
    expect(newRequest.blocks[1].state).toBe(State.PENDING);
  });

  it("should be able to complete intake-form and set approval active according to dependency", () => {
    newRequest.blocks[0].complete();
    newRequest.checkState("block");
    expect(newRequest.blocks[0].state).toBe(State.COMPLETE);
    expect(newRequest.blocks[1].state).toBe(State.ACTIVE);
  });

  it("should be able to complete approval block, and set request state to complete", () => {
    newRequest.blocks[1].complete();
    newRequest.checkState("block");
    expect(newRequest.blocks[1].state).toBe(State.COMPLETE);
    expect(newRequest.state).toBe(State.COMPLETE);
  });
});
