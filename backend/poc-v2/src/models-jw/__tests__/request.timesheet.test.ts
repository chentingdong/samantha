import { Request, STATE } from "../request";
//import { requestCatalog } from "../request-catalog";
import reqeustCatalog from "../data/requestCatalog.json";

import { Block } from "../block";
import { RequestDef } from "../../models-bj/request-def";
import { DependencyBlock } from "../../models-bj/block";
import { request } from "http";

describe("Request Use Case - Timesheet", () => {
  it("should return the list of request definitions from request Catalog", () => {
    const requestDefinitionList = reqeustCatalog;
    expect(requestDefinitionList.length).toBeGreaterThan(0);
  });

  it("should find 'Collect Team Timesheets' definition from request Catalog", () => {
    const findTimesheetDef = Request.getRequestDefByName("Collect Timesheets");
    expect(findTimesheetDef).toMatchObject(reqeustCatalog[2]);
  });

  it("should find 3 blockDefs in 'Collect Team Timesheets' definition ", () => {
    const findTimesheetDef = requestCatalog.find("Collect Team Timesheets");
    expect(findTimesheetDef.blockDefs.length).toBe(3);
  });

  it("3 blocks should be 1. subrequest.multipleResponders; 2. forReview Block; 3. Subreqeust.singleResponder", () => {
    const findTimesheetDef = requestCatalog.find("Collect Team Timesheets");
    const block1 = findTimesheetDef.blockDefs[0];
    const block2 = findTimesheetDef.blockDefs[1];
    const block3 = findTimesheetDef.blockDefs[2];

    expect(block1.type).toBe("sub-request");
    expect(block1.name).toBe("Collect Timesheet");
    expect(block1.multiInstance).toBeTruthy;
    expect(block1.shareContent).toBeFalsy;
    expect(block1.RequesterUI.summaryView.visible).toBeTruthy;
    expect(block1.RequesterUI.breakdownView.visible).toBeTruthy;

    expect(block2.type).toBe("leaf-block");
    expect(block2.name).toBe("form-review");
    const dependencySeriel = new DependencyBlock(block1);
    expect(block2.dependencies).toContainEqual(); // array of dependency need to have "Active-Until" another block complete

    expect(block3.type).toBe("sub-request");
    expect(block3.name).toBe("Get Approval");
    expect(block3.multiInstance).toBeFalsy;
    expect(block3.ResponderUI.summaryView.visible).toBeTruthy;
    expect(block3.ResponderUI.breakdownView.visible).toBeFalsy;
  });

  it("should be able to create new request from request Def", () => {
    const timesheetReq = new Request(
      requestCatalog.find("Collect Team Timesheets")
    );
    expect(timesheetReq).toBeDefined;
  });

  it("should be able to config new request", () => {
    const findTimesheetDef = requestCatalog.find("Collect Team Timesheets");
    const block1 = findTimesheetDef.blockDefs[0];
    const block3 = findTimesheetDef.blockDefs[2];
    const timesheetReq = new request(findTimesheetDef);
    timesheetReq.config.week = "2020-05-04";
    const userGroupEng = new userGroup("Engineering");
    timesheetReq.config.teamMember = userGroupEng.members; // array of users
    timesheetReq.config.approver = User.find({ title: "VP of Engineering" });

    // this is to test if adding teamMembers to config.teamMember array can auto set block1 multiple subrequests and each responder is a team member
    expect(block1.subrequest[0].responder).toContainEqual(
      User.find({ firstName: "baiji" })
    );
    expect(block1.subrequest[0].responder).toContainEqual(
      User.find({ firstName: "tingdong" })
    );
    expect(block1.subrequest[0].responder).toContainEqual(
      User.find({ firstName: "jin" })
    );
    expect(block3.subrequest[0].responder).toContainEqual(
      User.find({ firstName: "ben" })
    );
  });

  it("should be able to become active request for requestoer and responders", () => {
    const findTimesheetDef = requestCatalog.find("Collect Team Timesheets");
    const block1 = findTimesheetDef.blockDefs[0];
    const block3 = findTimesheetDef.blockDefs[2];
    const timesheetReq = new request(findTimesheetDef);
    timesheetReq.config.week = "2020-05-04";
    const userGroupEng = new userGroup("Engineering");
    timesheetReq.config.teamMember = userGroupEng.members; // array of users
    timesheetReq.config.approver = User.find({ title: "VP of Engineering" });
  });

  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});
});
