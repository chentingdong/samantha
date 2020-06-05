import { Request, State } from "../request";
import { Block, DependencyBlock } from "../block";
import reqeustCatalog from "../data/requestCatalog.json";
import blockLibrary from "../data/blockLibrary.json";
import { v4 as uuid } from "uuid";
import { User } from "../user";
//import { Context } from "../context";

describe("use case - team timesheet multiple subRequest instances", () => {
  // tests already covered in reqeust.empty.test.ts for create empty request
  const currentUser = new User(uuid(), "Jin", "jwang@bellhop.io");
  const requestDefDefault = Request.getRequestDefById();
  const newRequest = new Request(
    "test empty",
    "no block but as default",
    requestDefDefault
  );
  newRequest.setRequestor(currentUser);

  it("should be able to add subRequest block from blockLibrary and set requestDev, set config of blocks", () => {
    const testBlockDef = Block.getBlockById("SUBREQUEST", "");
    expect(testBlockDef).toMatchObject(blockLibrary.subRequestBlocks[0]);

    // need to have a userGroup with 3 members
    // start need to create 3 blocks at run time
    // newRequest.addBlockDef(testBlockDef);
    // const testBlock = new Block("Timesheet #22", testBlockDef);
    // testBlock.config.formType = "external";
    // testBlock.config.formLink = "https://sheet.gdrive.com/234567";
    // testBlock.setConfig();
    // newRequest.addBlock(testBlock);
    // expect(newRequest.blockDefs[0]).toMatchObject(testBlockDef);
    // expect(newRequest.blocks[0]).toMatchObject(testBlock);
    // expect(newRequest.blocks[0].data.externalLink).toBe(
    //   "https://sheet.gdrive.com/234567"
    // );
  });
  const findTeamTimesheetDef = Request.getRequestDefByName(
    "Collect Team Timesheets"
  );
  it("should find 'Collect Team Timesheets' definition from request Catalog and create new Request from it", () => {
    expect(findTeamTimesheetDef).toMatchObject(reqeustCatalog[3]);
  });

  it("should find 1 blockDef in 'Collect Team Timesheet' definition with multiple instance flag true", () => {
    const findTimesheetBlockDef = Block.getBlockByName(
      "LEAF",
      "weekly timesheet"
    );

    expect(findTeamTimesheetDef.blockDefs[0]).toMatchObject(
      findTimesheetBlockDef
    );
    expect(findTeamTimesheetDef.blockDefs[0].config.multiInstance).toBeTruthy;
  });

  const newTeamTimesheetRequest = new Request(
    "Week of 05-04-2020",
    "Engineering Team, 2nd week of sprint",
    findTeamTimesheetDef
  );

  it("should be able to create new request from found 'Collect Team Timesheets' definition from request Catalog", () => {
    expect(newTeamTimesheetRequest.originalRequestDef).toMatchObject(
      findTeamTimesheetDef
    );
    expect(newTeamTimesheetRequest.blockDefs).toMatchObject(
      findTeamTimesheetDef.blockDefs
    );
  });

  // it("3 blocks should be 1. subrequest.multipleResponders; 2. Review Block; 3. Subreqeust.singleResponder", () => {
  //   const teamTimesheetDef = requestCatalog.find("Collect Team Timesheets");
  //   const block1 = teamTimesheetDef.blockDefs[0];
  //   const block2 = findTimesheetDef.blockDefs[1];
  //   const block3 = findTimesheetDef.blockDefs[2];

  //   expect(block1.type).toBe("sub-request");
  //   expect(block1.name).toBe("Collect Timesheet");
  //   expect(block1.multiInstance).toBeTruthy;
  //   expect(block1.shareContent).toBeFalsy;
  //   expect(block1.RequesterUI.summaryView.visible).toBeTruthy;
  //   expect(block1.RequesterUI.breakdownView.visible).toBeTruthy;

  //   expect(block2.type).toBe("leaf-block");
  //   expect(block2.name).toBe("form-review");
  //   const dependencySeriel = new DependencyBlock(block1);
  //   block2.dependencies.push(dependencySeriel);
  //   expect(block2.dependencies).toContainEqual(dependencySeriel); // array of dependency need to have "Active-Until" another block complete

  //   expect(block3.type).toBe("sub-request");
  //   expect(block3.name).toBe("Get Approval");
  //   expect(block3.multiInstance).toBeFalsy;
  //   expect(block3.ResponderUI.summaryView.visible).toBeTruthy;
  //   expect(block3.ResponderUI.breakdownView.visible).toBeFalsy;
  // });

  // it("should be able to create new request from request Def", () => {
  //   const timesheetReq = new Request(
  //     requestCatalog.find("Collect Team Timesheets")
  //   );
  //   expect(timesheetReq).toBeDefined;
  // });

  // it("should be able to config new request", () => {
  //   const findTimesheetDef = requestCatalog.find("Collect Team Timesheets");
  //   const block1 = findTimesheetDef.blockDefs[0];
  //   const block3 = findTimesheetDef.blockDefs[2];
  //   const timesheetReq = new request(findTimesheetDef);
  //   const userGroupEng = new userGroup("Engineering");

  //   // config actions:
  //   timesheetReq.config.week = "2020-05-04";
  //   timesheetReq.config.teamMember = userGroupEng.members; // array of users
  //   timesheetReq.config.content = {
  //     timesheet: { source: "https://sheet.gdrive.com/234" },
  //   };
  //   timesheetReq.config.approver = User.find({ title: "VP of Engineering" });

  //   // this is to test if adding teamMembers to config.teamMember array can auto set block1 multiple subrequests and each responder is a team member
  //   expect(block1.subrequest[0].responder).toContainEqual(
  //     User.find({ firstName: "baiji" })
  //   );
  //   expect(block1.subrequest[1].responder).toContainEqual(
  //     User.find({ firstName: "tingdong" })
  //   );
  //   expect(block1.subrequest[2].responder).toContainEqual(
  //     User.find({ firstName: "jin" })
  //   );
  //   expect(block3.subrequest[0].responder).toContainEqual(
  //     User.find({ firstName: "ben" })
  //   );

  //   expect(block1.subrequest[0].content).toContainEqual(
  //     UtimesheetReq.config.content
  //   );
  // });

  // it("should be able to become active request for requester and responders", () => {
  //   const teamTimesheetDef = requestCatalog.find("Collect Team Timesheets");
  //   const block1 = teamTimesheetDef.blockDefs[0];
  //   const block3 = teamTimesheetDef.blockDefs[2];
  //   const timesheetReq = new request(findTimesheetDef);
  //   timesheetReq.config.week = "2020-05-04";
  //   const userGroupEng = new userGroup("Engineering");
  //   timesheetReq.config.teamMember = userGroupEng.members; // array of users
  //   timesheetReq.config.approver = User.find({ title: "VP of Engineering" });
  // });
});
